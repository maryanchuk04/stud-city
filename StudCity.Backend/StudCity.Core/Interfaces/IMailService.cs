namespace StudCity.Core.Interfaces;

public interface IMailService
{
    Task SendRegistrationMessageAsync(string email, string token);

    Task SendForgotPasswordMessage(string email, string codedId);

    Task SendMessage(string email, string subject, string message);
}
