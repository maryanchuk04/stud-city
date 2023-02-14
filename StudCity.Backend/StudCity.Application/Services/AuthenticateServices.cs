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
    private readonly IMailService _mailService;

    public AuthenticateServices(
        StudCityContext context,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IMailService mailService)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mailService = mailService;
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

        await _mailService.SendRegistrationMessageAsync(email, confirmationToken.Token);
        return result.Entity.Id;
    }

    // Authenticate after with verification token.
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

    // Authenticate with email and password.
    public async Task<AuthenticateResponseModel> AuthenticateAsync(string email, string password)
    {
        var account = _context.Accounts
            .Include(x => x.RefreshTokens)
            .Include(x => x.AccountRoles)
                .ThenInclude(x => x.Role)
            .FirstOrDefault(acc => acc.Email == email);

        if (account == null)
        {
            throw new AuthenticateException("Account with this email is not exist");
        }

        if (!_passwordHasher.VerifyPassword(password, account.Password))
        {
            throw new AuthenticateException("Incorrect email or password");
        }

        var jwtToken = _tokenService.GenerateAccessToken(account);
        var refreshToken = _tokenService.GenerateRefreshToken();

        await _context.SaveChangesAsync();

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }

    public async Task<bool> CanRegisterAsync(string email)
    {
        return await _context.Accounts.AnyAsync(x => x.Email == email);
    }
}
