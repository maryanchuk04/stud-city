namespace StudCity.Core.Entities;

public class UserGroup : BaseEntity
{
    public User User { get; set; }

    public Guid UserId { get; set; }

    public Group Group { get; set; }

    public Guid GroupId { get; set; }
}
