using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Infrastructure;

namespace StudCity.Application.Services;

public class MailService : IMailService
{
    private const string FromEmail = "waytodev@gmail.com";
    private const string FromName = "WayToDevAcc";

    private readonly IMailClient _mailClient;

    public MailService(IMailClient mailClient)
    {
        _mailClient = mailClient;
    }

    public async Task SendRegistrationMessageAsync(string email, string token)
    {
        const string subject = "Welcome to WayToDev";
        using var streamReader = File.OpenText($"StudCity.Application/Templates/ConfirmationLetter.html");
        var pin = token.Select(x => x.ToString()).ToArray();
        var htmlContent = string.Format(
            await streamReader.ReadToEndAsync(),
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
}
