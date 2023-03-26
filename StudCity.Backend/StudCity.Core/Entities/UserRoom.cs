namespace StudCity.Core.Entities;

public class UserRoom : BaseEntity
{
    public Room Room { get; set; }

    public Guid RoomId { get; set; }

    public User User { get; set; }

    public Guid UserId { get; set; }
}
