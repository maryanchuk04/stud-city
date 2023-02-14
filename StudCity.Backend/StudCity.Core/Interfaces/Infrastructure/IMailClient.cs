namespace StudCity.Core.Interfaces.Infrastructure;

public interface IMailClient
{
    Task SendTextMessageAsync(string subject, string plainContent, string from, string to, string fromUserName);

    Task SendHtmlMessageAsync(string subject, string htmlContent, string from, string to, string fromUserName);
}
