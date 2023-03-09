using StudCity.Core.Entities;

namespace StudCity.Core.DTOs;

public class AccountDto
{
    public string Email { get; set; }

    public IEnumerable<AccountRole> Roles { get; set; }
}
