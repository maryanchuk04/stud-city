using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IAuthenticateService
{
    Task<Guid> RegistrationBeginAsync(string email, string password);

    Task<bool> CanRegisterAsync(string email);

    Task<AuthenticateResponseModel> AuthenticateAsync(Guid accountId, string verificationToken);

    Task<AuthenticateResponseModel> AuthenticateAsync(string email, string password);
}
