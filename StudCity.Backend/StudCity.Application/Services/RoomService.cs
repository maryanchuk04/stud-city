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
    private readonly ISecurityContext _securityContext;
    private readonly IMapper _mapper;

    public RoomService(StudCityContext context, IMapper mapper, ISecurityContext securityContext)
    {
        _context = context;
        _mapper = mapper;
        _securityContext = securityContext;
    }

    public async Task<RoomDto> GetRoom(Guid chatId, Guid userId)
    {
        var room = _context.Rooms
                       .FirstOrDefault(x => x.Id == chatId) ??
                   _context.Rooms
                       .FirstOrDefault(x =>
                           x.UserRooms.Count >= 2 &&
                           x.UserRooms.Any(y => y.UserId == chatId) &&
                           x.UserRooms.Any(y => y.UserId == userId));

        if (room == null)
        {
            room = CreateRoom(chatId, userId);
            _context.Rooms.Add(room);

            await _context.SaveChangesAsync();
        }

        var res = _context.Rooms
            .Include(x => x.UserRooms)
                .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .Include(c => c.Messages
                .OrderByDescending(x => x.When)
                .Take(20))
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Image)
            .FirstOrDefault(x => x.Id == room.Id);

        if (res == null)
        {
            throw new NotFoundException(nameof(Room), room.Id);
        }

        return _mapper.Map<Room, RoomDto>(res);
    }

    public async Task<IEnumerable<RoomPreviewDto>> GetUsersRooms()
    {
        var rooms = _context.Rooms
            .Include(x=>x.UserRooms)
            .ThenInclude(x=>x.User)
            .Where(x => x.UserRooms.Any(u => u.User.Id == _securityContext.GetCurrentUserId()));

        if (!rooms.Any())
        {
            return Enumerable.Empty<RoomPreviewDto>();
        }

        var res = await rooms.Include(x => x.Messages)
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .ToListAsync();

        return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomPreviewDto>>(res);
    }

    public async Task<RoomDto> CreateRoom(IEnumerable<Guid> usersIds, string title)
    {
        var room = new Room() { UserRooms = new List<UserRoom>(), Title = title, Messages = new List<Message>() };

        foreach (var userId in usersIds)
        {
            room.UserRooms.Add(new UserRoom()
            {
                RoomId = room.Id,
                UserId = userId
            });
        }

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        return await GetRoom(room.Id, _securityContext.GetCurrentUserId());
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
