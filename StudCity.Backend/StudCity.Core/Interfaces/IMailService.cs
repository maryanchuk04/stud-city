namespace StudCity.Core.Interfaces;

public interface IMailService
{
    Task SendRegistrationMessageAsync(string email, string token);
}
