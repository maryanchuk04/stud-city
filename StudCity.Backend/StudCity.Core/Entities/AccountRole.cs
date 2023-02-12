using System.ComponentModel.DataAnnotations;

namespace StudCity.Core.Entities;

public class AccountRole
{
    [Key]
    public Enums.Role RoleId { get; set; }

    public Guid AccountId { get; set; }

    public virtual Account Account { get; set; }

    public virtual Role Role { get; set; }
}
