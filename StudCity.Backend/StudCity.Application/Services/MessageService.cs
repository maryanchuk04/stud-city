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
    public MessageService(StudCityContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<MessageDto> Send(Guid roomId, Guid userId, string message)
    {
        if (!await _context.Rooms.AnyAsync(room => room.Id == roomId))
        {
            throw new NotFoundException(nameof(Room), roomId);
        }

        var messageEntity = await _context.Messages.AddAsync(new Message { Content = message, UserId = userId, RoomId = roomId, });

        var newMessage = await _context.Messages
            .Include(x => x.Room)
            .Include(x=>x.User)
            .ThenInclude(x=>x.Image)
            .FirstAsync(x => x.Id == messageEntity.Entity.Id);

        return _mapper.Map<Message, MessageDto>(newMessage);
    }
}
