namespace StudCity.Core.Entities;

public class Image : BaseEntity
{
    public string ImageUrl { get; set; }

    public Image(string imageUrl)
    {
        ImageUrl = imageUrl;
    }
}
