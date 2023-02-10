using StudCity.Core.Entities;

namespace StudCity.Core.Interfaces.Providers;

public interface ITokenProvider
{
    AccountToken ProvideEmailConfirmationToken(Guid accountId);

    AccountToken ProvideRefreshToken(byte[] bytes);
}
