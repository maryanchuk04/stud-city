using Microsoft.AspNetCore.Authorization;

namespace StudCity.API.Policies;

public class RoleRequirement : IAuthorizationRequirement
{
    public RoleRequirement(string role)
    {
        Role = role;
    }

    public string Role { get; set; }
}
