using StudCity.Core.ConfigurationModels;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Infrastructure;

namespace StudCity.Application.Services;

public class MailService : IMailService
{
    private readonly AppConfigurationModel _appConfiguration;
    private const string FromEmail = "lion20914king@gmail.com";
    private const string FromName = "StudCityAccount";

    private readonly IMailClient _mailClient;

    public MailService(IMailClient mailClient, AppConfigurationModel appConfiguration)
    {
        _mailClient = mailClient;
        _appConfiguration = appConfiguration;
    }

    public async Task SendRegistrationMessageAsync(string email, string token)
    {
        const string subject = "Welcome to StudCity";
        using var streamReader = File.OpenText($"./wwwroot/html/ConfirmationLetter.html");
        var pin = token.Select(x => x.ToString()).ToArray();
        var fileContent = await streamReader.ReadToEndAsync();
        var htmlContent = string.Format(
            fileContent,
            pin[0],
            pin[1],
            pin[2],
            pin[3],
            pin[4],
            pin[5]);
        await _mailClient.SendHtmlMessageAsync(
            subject,
            htmlContent,
            FromEmail,
            email,
            FromName);
    }

    public async Task SendForgotPasswordMessage(string email, string codedId)
    {
        const string subject = "Forgot password";
        using var streamReader = File.OpenText($"/wwwroot/html/ForgotPassword.html");
        var fileContent = await streamReader.ReadToEndAsync();
        string htmlContent = string.Format(fileContent, $"{_appConfiguration.FrontendPath}/recovery-password/{codedId}");

        await _mailClient.SendHtmlMessageAsync(subject, htmlContent, FromEmail, email, FromName);
    }

    public async Task SendMessage(string email, string subject, string message)
    {
        await _mailClient.SendTextMessageAsync(subject, message, FromEmail, email, FromName);
    }
}
