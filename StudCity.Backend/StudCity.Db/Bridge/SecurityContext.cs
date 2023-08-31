using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.Db.Bridge;

public class SecurityContext : ISecurityContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SecurityContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid GetCurrentAccountId()
    {
        var guidClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name);

        if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
        {
            throw new Exception("Account not found");
        }

        return result;
    }

    public Guid GetCurrentUserId()
    {
        var guidClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Surname);

        if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
        {
            throw new UserNotFoundException();
        }

        return result;
    }
}
