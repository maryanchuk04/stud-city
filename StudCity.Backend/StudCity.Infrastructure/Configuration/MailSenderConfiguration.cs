namespace StudCity.Infrastructure.Configuration;

public class MailSenderConfiguration
{
    public string AuthUserName { get; set; }

    public string AuthPassword { get; set; }

    public string Host { get; set; }

    public int Port { get; set; }

    public bool UseSsl { get; set; }
}
