using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Core.CommandHandlers;

public class GoogleAuthenticateCommand : IRequest<AuthenticateResponseModel>
{
    public GoogleAuthenticateCommand(string email, string picture, string hd, string name)
    {
        Email = email;
        Picture = picture;
        Hd = hd;
        Name = name;
    }

    public string Email { get; set; }

    public string Picture { get; set; }

    public string Hd { get; set; }

    public string Name { get; set; }
}

public class GoogleAuthenticateCommandHandler
    : IRequestHandler<GoogleAuthenticateCommand, AuthenticateResponseModel>
{
    private readonly StudCityContext _db;
    private readonly ILogger<GoogleAuthenticateCommandHandler> _logger;
    private readonly ITokenService _tokenService;
    private readonly IAuthenticateService _authenticateService;

    public GoogleAuthenticateCommandHandler(
        StudCityContext db,
        ILogger<GoogleAuthenticateCommandHandler> logger,
        ITokenService tokenService,
        IAuthenticateService authenticateService)
    {
        _db = db;
        _logger = logger;
        _tokenService = tokenService;
        _authenticateService = authenticateService;
    }

    public async Task<AuthenticateResponseModel> Handle(GoogleAuthenticateCommand request, CancellationToken cancellationToken)
    {
        var account = _db.Accounts
            .Include(x => x.AccountRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefault(x => x.Email == request.Email);

        if (account == null)
        {
            // REGISTRATION USER
            var accountId = await _authenticateService.RegistrationBeginAsync(request.Email, null);
            var newAccount = await _db.Accounts.FirstAsync(x => x.Id == accountId, cancellationToken: cancellationToken);

            newAccount.AuthType = Enums.AuthType.Google;
            newAccount.AccountRoles = new List<AccountRole>
            {
                new ()
                {
                    AccountId = accountId,
                    RoleId = Enums.Role.User,
                    Role = _db.Roles.First(x => x.Id == Enums.Role.User),
                },
            };

            _logger.LogInformation("Start creating new Account");

            var jwt = _tokenService.GenerateAccessToken(newAccount);
            var rt = _tokenService.GenerateRefreshToken();

            _db.Accounts.Update(newAccount);
            await _db.SaveChangesAsync(cancellationToken);

            return new AuthenticateResponseModel(jwt, rt.Token) { IsRegistration = true };
        }

        if (account.AuthType != Enums.AuthType.Google)
        {
            _logger.LogError("Account with {email} can be authorized by {authType}", account.Email, account.AuthType);
            throw new AuthenticateException("This action is not available to this user");
        }

        // LOGIN USER
        var jwtToken = _tokenService.GenerateAccessToken(account);
        var refreshToken = _tokenService.GenerateRefreshToken();

        await _db.SaveChangesAsync(cancellationToken);

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }
}
