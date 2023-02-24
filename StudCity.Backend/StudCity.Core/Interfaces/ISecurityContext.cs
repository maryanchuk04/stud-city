namespace StudCity.Core.Interfaces;

public interface ISecurityContext
{
    Guid GetCurrentAccountId();

    Guid GetCurrentUserId();
}
