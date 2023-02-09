using StudCity.Core.Entities;
using StudCity.Core.Enums;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Providers;

namespace StudCity.Application.Providers;

public class TokenProvider : ITokenProvider
{
    private readonly IPinGenerator _pinGenerator;

    public TokenProvider(IPinGenerator pinGenerator)
    {
        _pinGenerator = pinGenerator;
    }

    public AccountToken ProvideEmailConfirmationToken(Guid accountId)
    {
        return new AccountToken()
        {
            Token = _pinGenerator.Generate().ToString(),
            Expires = DateTime.Now.AddDays(7),
            Created = DateTime.Now,
            AccountId = accountId,
            Type = TokenType.EmailConfirmationType
        };
 
    }

    public AccountToken ProvideRefreshToken(byte[] bytes)
    {
        return new AccountToken
        {
            Token = Convert.ToBase64String(bytes),
            Expires = DateTime.Now.AddDays(7),
            Created = DateTime.Now,
        };
    }
}