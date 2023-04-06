using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IMessageService
{
    Task<MessageDto> Send(Guid roomId, Guid userId, string message);

    /// <summary>
    /// Seen Messages
    /// </summary>
    /// <param name="ids">Messages ids</param>
    Task SeenMessages(IEnumerable<Guid> ids);
}
