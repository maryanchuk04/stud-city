using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IRoomService
{
    Task<RoomDto> GetRoom(Guid roomId, Guid userId);

    Task<IEnumerable<RoomPreviewDto>> GetUsersRooms();

    Task<RoomDto> CreateRoom(List<Guid> usersIds, string title, string imageUrl);

    Task<RoomDto> AddUserToRoom(Guid id, IEnumerable<Guid> usersIds);

    Task<RoomDto> GetRoomById(Guid id);
}
