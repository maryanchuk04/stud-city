using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class RoomService : IRoomService
{
    private readonly StudCityContext _context;
    private readonly IMapper _mapper;

    public RoomService(StudCityContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<RoomDto> GetRoom(Guid chatId, Guid userId)
    {
        var room = _context.Rooms
                       .FirstOrDefault(x => x.Id == chatId) ??
                   _context.Rooms
                       .FirstOrDefault(x =>
                           x.UserRooms.Count == 2 &&
                           x.UserRooms.Any(y => y.UserId == chatId) &&
                           x.UserRooms.Any(y => y.UserId == userId));

        if (room == null)
        {
            room = CreateRoom(chatId, userId);
            _context.Rooms.Add(room);

            await _context.SaveChangesAsync();
        }

        var res = _context.Rooms
            .Include(c => c.Messages
                .OrderByDescending(x=>x.When)
                .Take(20))
            .ThenInclude(x=>x.User)
            .FirstOrDefault(x => x.Id == room.Id);

        if (res == null)
        {
            throw new NotFoundException(nameof(Room), room.Id);
        }

        return _mapper.Map<Room, RoomDto>(res);
    }

    private Room CreateRoom(Guid id, Guid userId)
    {
        var temp = _context.Users.FirstOrDefault(x => x.Id == id);
        var room = new Room
        {
            Title = temp?.FirstName + " " + temp?.LastName
        };

        room.UserRooms = new List<UserRoom>
        {
            new() { Room = room, UserId = id },
            new() { Room = room, UserId = userId },
        };

        return room;
    }
}
