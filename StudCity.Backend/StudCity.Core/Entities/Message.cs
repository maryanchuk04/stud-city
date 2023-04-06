namespace StudCity.Core.Entities;

public class Message : BaseEntity
{
    public string Content { get; set; }

    public DateTime When { get; set; } = DateTime.Now;

    public User User { get; set; }

    // Sender id
    public Guid UserId { get; set; }

    public Room Room { get; set; }

    public Guid RoomId { get; set; }

    //public List<Guid> SeenMessage { get; set; }

    //public bool AllSeen { get; set; }
}
