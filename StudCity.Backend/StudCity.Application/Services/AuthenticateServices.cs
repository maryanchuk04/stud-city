using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;
using Role = StudCity.Core.Enums.Role;

namespace StudCity.Application.Services;

public class AuthenticateServices : IAuthenticateService
{
    private readonly StudCityContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;

    public AuthenticateServices(StudCityContext context, IPasswordHasher passwordHasher, ITokenService tokenService)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }

    public async Task<Guid> RegistrationBeginAsync(string email, string password)
    {
        var account = new Account()
        {
            Email = email,
            Password = _passwordHasher.HashPassword(password),
            AccountRoles = new[] { new AccountRole { RoleId = Role.User } },
            IsBlocked = true,
        };

        var result = await _context.Accounts.AddAsync(account);
        var confirmationToken = await _tokenService.GenerateEmailConfirmationTokenAsync(result.Entity.Id);

        // TODO Email sender
        return result.Entity.Id;
    }

    // Authenticate after with verification token
    public async Task<AuthenticateResponseModel> AuthenticateAsync(Guid accountId, string verificationToken)
    {
        try
        {
            var account = await _tokenService.VerifyEmailConfirmationToken(accountId, verificationToken);

            // unblocked account
            account.IsBlocked = false;

            var jwtToken = _tokenService.GenerateAccessToken(account);
            var refreshToken = _tokenService.GenerateRefreshToken();

            await _context.SaveChangesAsync();

            return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
        }
        catch (TokenException e)
        {
            throw new AuthenticateException(e.Message);
        }
    }

    public async Task<bool> CanRegisterAsync(string email)
    {
        return await _context.Accounts.AnyAsync(x => x.Email == email);
    }
}
