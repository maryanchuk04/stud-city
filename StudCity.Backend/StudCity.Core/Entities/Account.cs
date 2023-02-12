namespace StudCity.Core.Entities;

public class Account : BaseEntity
{
    public string Email { get; set; }

    public bool IsBlocked { get; set; }

    public string Password { get; set; }

    public User User { get; set; }

    public Guid? UserId { get; set; }

    public ICollection<AccountRole> AccountRoles { get; set; }

    public ICollection<AccountToken> RefreshTokens { get; set; }
}

