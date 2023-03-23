namespace StudCity.Core.Entities;

public class Room : BaseEntity
{
    public string Title { get; set; }
    public Image Image { get; set; }
    public ICollection<Message> Messages { get; set; }
    public ICollection<UserRoom> UserRooms { get; set; }
}
