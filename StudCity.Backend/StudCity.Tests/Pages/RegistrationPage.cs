using Microsoft.Playwright;

namespace StudCity.Tests.Pages;

public class RegistrationPage
{
    private readonly IPage _page;
    private readonly ILocator _btnSubmit;
    private readonly ILocator _txtEmail;
    private readonly ILocator _txtPassword;
    private readonly ILocator _txtConfirmPassword;

    public RegistrationPage(IPage page)
    {
        _page = page;
        _btnSubmit = _page.Locator("text=Submit");
        _txtEmail = _page.GetByPlaceholder("Enter your email");
        _txtPassword = _page.GetByPlaceholder("Enter your password");
        _txtConfirmPassword = _page.GetByPlaceholder("Repeat your password");
    }

    public async Task SubmitClick() => await _btnSubmit.ClickAsync();

    public async Task<bool> SubmitIsDisabled() => await _btnSubmit.IsDisabledAsync();

    public async Task Register(string email, string password, string confirmPassword)
    {
        await FillFormAsync(email, password, confirmPassword);
        await SubmitClick();
    }

    public async Task FillFormAsync(string email, string password, string confirmPassword)
    {
        await _txtEmail.FillAsync(email);
        await _txtPassword.FillAsync(password);
        await _txtConfirmPassword.FillAsync(confirmPassword);
    }
}
