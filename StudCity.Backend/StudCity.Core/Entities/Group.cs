namespace StudCity.Core.Entities;

public class Group : BaseEntity
{
    public string Name { get; set; }

    // Owner Id
    public Guid UserId { get; set; }

    public virtual User User { get; set; }

    public Image Image { get; set; }

    public string Description { get; set; }

    public ICollection<UserGroup> UserGroups { get; set; }
}
