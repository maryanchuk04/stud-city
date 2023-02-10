using StudCity.Core.Entities;

namespace StudCity.Core.Interfaces;

public interface ITokenService
{
    Task<AccountToken> GenerateEmailConfirmationTokenAsync(Guid accountId);
    Task<Account> VerifyEmailConfirmationToken(Guid accountId, string token);
    string GenerateAccessToken(Account account);
    AccountToken GenerateRefreshToken();
}