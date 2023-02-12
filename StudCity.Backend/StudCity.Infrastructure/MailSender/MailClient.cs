using MimeKit;
using MimeKit.Text;
using StudCity.Core.Interfaces.Infrastructure;
using StudCity.Infrastructure.Configuration;

namespace StudCity.Infrastructure.MailSender;

public class MailClient : IMailClient
{
    private readonly MailSenderConfiguration _configuration;

    public MailClient(MailSenderConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendTextMessageAsync(string subject, string plainContent, string from, string to, string fromUserName)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(fromUserName, from));
        message.To.Add(new MailboxAddress(to, to));
        message.Subject = subject;
        message.Body = new BodyBuilder
        {
            TextBody = plainContent,
        }.ToMessageBody();
        await SendMessageAsync(message);
    }

    public async Task SendHtmlMessageAsync(string subject, string htmlContent, string from, string to, string fromUserName)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(fromUserName, from));
        message.To.Add(new MailboxAddress(to, to));
        message.Subject = subject;
        message.Body = new TextPart(TextFormat.Html) { Text = htmlContent };
        await SendMessageAsync(message);
    }

    private async Task SendMessageAsync(MimeMessage message)
    {
        using var client = new MailKit.Net.Smtp.SmtpClient();
        try
        {
            await client.ConnectAsync(_configuration.Host, _configuration.Port, _configuration.UseSsl);
            await client.AuthenticateAsync(_configuration.AuthUserName, _configuration.AuthPassword);
            await client.SendAsync(message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}
