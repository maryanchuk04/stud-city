namespace StudCity.API.Hubs;

public class RoomConnections
{
    public Guid RoomId { get; set; }

    public IEnumerable<Guid> ConnectedUsersIds { get; set; }
}
