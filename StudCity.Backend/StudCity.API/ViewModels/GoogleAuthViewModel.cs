namespace StudCity.API.ViewModels;

public class GoogleAuthViewModel
{
    public string Email { get; set; }

    public string Name { get; set; }

    public string Picture { get; set; }

    /// <summary>
    /// domain name of email.
    /// </summary>
    public string Hd { get; set; }
}
