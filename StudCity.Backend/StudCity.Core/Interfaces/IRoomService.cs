using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IRoomService
{
    Task<RoomDto> GetRoom(Guid roomId, Guid userId);

    Task<IEnumerable<RoomPreviewDto>> GetUsersRooms();

    Task<RoomDto> CreateRoom(IEnumerable<Guid> usersIds, string title);

    Task<RoomDto> GetRoomById(Guid id);
}