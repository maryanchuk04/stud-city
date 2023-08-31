namespace StudCity.Core.Entities;

public class PublicAdmin : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; }

    public Guid PublicId { get; set; }

    public Public Public { get; set; }
}
