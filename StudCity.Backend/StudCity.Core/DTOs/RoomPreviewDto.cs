namespace StudCity.Core.DTOs;

public class RoomPreviewDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public MessagePreviewDto Message { get; set; }

    public string Avatar { get; set; }
}
