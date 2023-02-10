namespace StudCity.Core.Entities;

public class Role
{
    public Enums.Role Id { get; set; }

    public string Name { get; set; }

    public ICollection<AccountRole> Accounts { get; set; }
}
