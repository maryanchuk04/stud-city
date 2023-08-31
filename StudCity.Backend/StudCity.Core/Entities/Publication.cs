namespace StudCity.Core.Entities;

/// <summary>
/// Publication for Grop
/// </summary>
public class Publication : BaseEntity
{
    public Guid OwnerId { get; set; }

    public User Owner { get; set; }

    public string Title { get; set; }

    public ICollection<PublicationImage> Images { get; set; }

    public ICollection<Comment> Comments { get; set; }

    public ICollection<Like> Likes { get; set; }
}

