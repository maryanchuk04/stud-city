using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using StudCity.Core.Interfaces;

namespace StudCity.API.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly IDictionary<string, string> _connections = new Dictionary<string, string>();
    private readonly IMessageService _messageService;
    private readonly ISecurityContext _securityContext;

    public ChatHub(IMessageService messageService, ISecurityContext securityContext)
    {
        _messageService = messageService;
        _securityContext = securityContext;
    }

    private async Task JoinRoom(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        _connections[Context.ConnectionId] = chatId;
        await Clients.Group(chatId).SendAsync("JoinToRoom", "Was connected to room");
        await SendUsersConnected(chatId);
    }

    public async Task SendMessage(Guid chatId, string message)
    {
        if (message.Trim() != string.Empty)
        {
            var currentUserId = _securityContext.GetCurrentUserId();
            var res = await _messageService.Send(chatId, currentUserId, message);

            await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", res);
        }
    }

    public async Task JoinToUsersRooms(List<string> chatsIds)
    {
        foreach (var item in chatsIds)
        {
            await JoinRoom(item);
        }
    }

    private Task SendUsersConnected(string chatId)
    {
        var users = _connections.Values.Where(x => x == chatId);

        return Clients.Group(chatId).SendAsync("UsersInRoom", users);
    }
}
