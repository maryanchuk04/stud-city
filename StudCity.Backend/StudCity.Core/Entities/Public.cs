namespace StudCity.Core.Entities;

public class Public : BaseEntity
{
    public string Name { get; set; }

    /// <summary>
    /// Owner ID
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Owner
    /// </summary>
    public virtual User User { get; set; }

    public Image Image { get; set; }

    public string Description { get; set; }

    public ICollection<PublicAdmin> PublicAdmins { get; set; }

    public ICollection<UserPublic> UserPublics { get; set; }

    public ICollection<Publication> Publications { get; set; }

    public string CodeWord { get; set; }

    public bool IsPrivate { get; set; }
}
