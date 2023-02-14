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
    private readonly ICryptographer _cryptographer;

    public AuthenticateServices(
        StudCityContext context,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IMailService mailService,
        ICryptographer cryptographer)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mailService = mailService;
        _cryptographer = cryptographer;
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

    public async Task ForgotPassword(string email)
    {
        var account = await _context.Accounts
            .FirstOrDefaultAsync(x => x.Email == email);

        if (account == null)
        {
            throw new AuthenticateException("Account is not exist");
        }

        var codedId = _cryptographer.Encode(account.Id.ToString());
        await _mailService.SendForgotPasswordMessage(email, codedId);
    }

    public async Task RecoveryPassword(string hashingAccountId, string password)
    {
        var accountId = Guid.Parse(_cryptographer.Decode(hashingAccountId));
        var account = _context.Accounts
            .FirstOrDefault(x => x.Id == accountId);

        if (account == null)
        {
            throw new AuthenticateException("Account is not exist");
        }

        account.Password = _passwordHasher.HashPassword(password);

        _context.Accounts.Update(account);
        await _context.SaveChangesAsync();
        await _mailService.SendMessage(account.Email, "Password changed!", "Your password was successfully changed");
    }

    public async Task<bool> CanRegisterAsync(string email)
    {
        return await _context.Accounts.AnyAsync(x => x.Email == email);
    }
}
