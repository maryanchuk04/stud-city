namespace StudCity.Core.Entities;

public class Like : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; }
}
