using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class MessageService : IMessageService
{
    private readonly StudCityContext _context;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;

    public MessageService(StudCityContext context, IMapper mapper, ISecurityContext securityContext)
    {
        _context = context;
        _mapper = mapper;
        _securityContext = securityContext;
    }

    public async Task<MessageDto> Send(Guid roomId, Guid userId, string message)
    {
        if (!await _context.Rooms.AnyAsync(room => room.Id == roomId))
        {
            throw new NotFoundException(nameof(Room), roomId);
        }

        var messageEntity = await _context.Messages.AddAsync(new Message { Content = message, UserId = userId, RoomId = roomId, });

        await _context.SaveChangesAsync();

        var newMessage = await _context.Messages
            .Include(x=>x.User)
            .ThenInclude(x=>x.Image)
            .FirstAsync(x => x.Id == messageEntity.Entity.Id);

        return _mapper.Map<Message, MessageDto>(newMessage);
    }

    public async Task SeenMessages(IEnumerable<Guid> ids)
    {
        var userId = _securityContext.GetCurrentUserId();

        foreach (var msgId in ids)
        {
            var message = await _context.Messages
                .FindAsync(msgId);

            if (message == null)
            {
                throw new NotFoundException(nameof(Message), msgId);
            }

            //if (!message.SeenMessage.Contains(userId))
                //message.SeenMessage.Add(userId);

            // TODO If SeenMessage == users rooms count all seen = true

            _context.Messages.Update(message);

            await _context.SaveChangesAsync();
        }
    }
}
