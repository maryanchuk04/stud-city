namespace StudCity.Core.DTOs;

public class RoomDto
{
    public Guid Id { get; set; }

    public IEnumerable<UserPreviewDto> Users { get; set; }

    public IEnumerable<MessageDto> Messages { get; set; }

    public string Title { get; set; }

    public string Image { get; set; }
}
