namespace StudCity.Core.Entities;

public class UserPublic : BaseEntity
{
    public User User { get; set; }

    public Guid UserId { get; set; }

    public Public Public { get; set; }

    public Guid PublicId { get; set; }
}
