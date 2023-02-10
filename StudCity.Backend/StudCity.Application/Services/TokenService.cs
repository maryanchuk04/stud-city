using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudCity.Core.ConfigurationModels;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Providers;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class TokenService : ITokenService
{
    private readonly StudCityContext _context;
    private readonly IPinGenerator _pinGenerator;
    private readonly ITokenProvider _provider;
    private readonly JwtConfiguration _jwtConfiguration;

    public TokenService(
        StudCityContext context,
        IPinGenerator pinGenerator, 
        ITokenProvider provider, 
        JwtConfiguration jwtConfiguration
        )
    {
        _context = context;
        _pinGenerator = pinGenerator;
        _provider = provider;
        _jwtConfiguration = jwtConfiguration;
    }
    
    public async Task<AccountToken> GenerateEmailConfirmationTokenAsync(Guid accountId)
    {
        var token = _provider.ProvideEmailConfirmationToken(accountId);

        await _context.AccountTokens.AddAsync(token);
        await _context.SaveChangesAsync();

        return token;
    }

    public async Task<Account> VerifyEmailConfirmationToken(Guid accountId, string token)
    {
        var accountTokens = await _context.AccountTokens
            .Include(x => x.Account)
                .ThenInclude(x=>x.AccountRoles)
                    .ThenInclude(x=>x.Role)
            .FirstOrDefaultAsync(x => x.AccountId == accountId && x.Token.Equals(token));
        
        if (accountTokens == null)
            throw new TokenException("Error in confirmation token");

        if (DateTime.UtcNow >= accountTokens.Expires)
            throw new TokenException("Confirmation token time is over");
        
        return accountTokens.Account;
    }

    public string GenerateAccessToken(Account account)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = GetClaims(account);
        var token = new JwtSecurityToken(_jwtConfiguration.Issuer,
            _jwtConfiguration.Audience,
            claims,
            expires: DateTime.Now.AddMinutes(30000),
            signingCredentials: credentials);
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public AccountToken GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return _provider.ProvideRefreshToken(randomNumber);
    }

    private IEnumerable<Claim> GetClaims(Account account)
    {
        var claims = new List<Claim>();
        if (account.UserId != null)
        {
            claims.Add(new Claim(ClaimTypes.Name, $"{account.UserId}"));
        }

        claims.Add(new Claim(ClaimTypes.Sid, $"{account.Id}"));
        var roles = account.AccountRoles.Select(ar => ar.Role);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role.Name)));

        return claims;
    }
}