using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IRoomService
{
    Task<RoomDto> GetRoom(Guid roomId, Guid userId);
}
