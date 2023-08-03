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
                .OrderBy(x => x.When)
                .Take(20))
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Image)
            .FirstOrDefault(x => x.Id == room.Id);

        return res == null ? throw new NotFoundException(nameof(Room), room.Id)
            : _mapper.Map<Room, RoomDto>(res);
    }

    public async Task<IEnumerable<RoomPreviewDto>> GetUsersRooms()
    {
        var rooms = _context.Rooms
            .Include(x => x.UserRooms)
                .ThenInclude(x => x.User)
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

    public async Task<RoomDto> CreateRoom(
        List<Guid> usersIds,
        string title,
        string imageUrl)
    {
        var newRoomId = Guid.NewGuid();
        var currentUserId = _securityContext.GetCurrentUserId();

        var room = new Room
        {
            Id = newRoomId,
            UserRooms = new List<UserRoom>(),
            Title = title,
            Image = new Image(imageUrl),
            Messages = new List<Message>(),
        };

        usersIds.Add(currentUserId);

        foreach (var userId in usersIds)
        {
            room.UserRooms.Add(new UserRoom()
            {
                Id = Guid.NewGuid(),
                RoomId = room.Id,
                UserId = userId,
            });
        }

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        return await GetRoomById(room.Id);
    }

    public async Task<RoomDto> AddUserToRoom(Guid id, IEnumerable<Guid> usersIds)
    {
        var room = await _context.Rooms
            .Include(x => x.UserRooms)
                .ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new NotFoundException(nameof(Room), id);

        foreach (var userId in usersIds)
        {
            room.UserRooms.Add(new UserRoom()
            {
                UserId = userId,
                RoomId = room.Id,
            });
        }

        _context.Rooms.Update(room);

        await _context.SaveChangesAsync();

        return await GetRoomById(id);
    }

    public async Task<RoomDto> GetRoomById(Guid id)
    {
        var room = await _context.Rooms
            .Where(r => r.Id == id)
            .Include(x => x.UserRooms)
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Image)
            .Include(c => c.Messages)
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Image)
            .FirstOrDefaultAsync();

        return room == null ? throw new NotFoundException(nameof(Room), id)
            : _mapper.Map<Room, RoomDto>(room);
    }

    private Room CreateRoom(Guid id, Guid userId)
    {
        var temp = _context.Users.FirstOrDefault(x => x.Id == id);
        var room = new Room
        {
            Title = temp?.FirstName + " " + temp?.LastName,
        };

        room.UserRooms = new List<UserRoom>
        {
            new () { Room = room, UserId = id },
            new () { Room = room, UserId = userId },
        };

        return room;
    }
}
