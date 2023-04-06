using Microsoft.Playwright;

namespace StudCity.Tests.Pages;

public class LoginPage
{
    private readonly IPage _page;
    private readonly ILocator _btnLogin;
    private readonly ILocator _txtEmail;
    private readonly ILocator _txtPassword;

    public LoginPage(IPage page)
    {
        _page = page;
        _btnLogin = _page.Locator("text=Submit");
        _txtEmail = _page.GetByPlaceholder("Enter your email");
        _txtPassword = _page.GetByPlaceholder("Enter your password");
    }

    public async Task ClickLogin() => await _btnLogin.ClickAsync();

    public async Task<bool> FormIsValid() => !await _btnLogin.IsDisabledAsync();

    public async Task Login(string email, string password)
    {
        await _txtEmail.FillAsync(email);
        await _txtPassword.FillAsync(password);
    }
}
