namespace StudCity.Core.DTOs;

public class MessageDto
{
    public Guid Id { get; set; }

    public string Content { get; set; }

    public DateTime When { get; set; }

    public UserPreviewDto User { get; set; }

    public RoomDto Room { get; set; }

    public Guid RoomId { get; set; }
}
