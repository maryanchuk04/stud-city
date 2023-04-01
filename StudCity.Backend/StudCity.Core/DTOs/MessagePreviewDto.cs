namespace StudCity.Core.DTOs;

public class MessagePreviewDto
{
    public string Content { get; set; }

    public DateTime When { get; set; }

    public UserPreviewDto User { get; set; }
}
