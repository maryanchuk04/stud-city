using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using StudCity.Tests.Pages;

namespace StudCity.Tests.PagesTests;

[TestFixture]
public class AuthenticatePageTests : PageTest
{
    private string _url;

    [SetUp]
    public async Task SetUp()
    {
        var baseUrl = TestContext.Parameters["WebAppUrl"]
                    ?? throw new Exception("WebAppUrl is not configured as a parameter.");

        _url = $"{baseUrl}/authenticate";
        await Page.GotoAsync(_url, new PageGotoOptions { WaitUntil = WaitUntilState.NetworkIdle });
    }

    [Test]
    [TestCase("lion20914king@gmail.com", "Maks-010104")]
    [Obsolete("Obsolete")]
    public async Task Login_And_Navigate_To_Profile(string email, string password)
    {
        LoginPage loginPage = new LoginPage(Page);

        await Page.RunAndWaitForNavigationAsync(async () =>
        {
            await loginPage.Login(email, password);
            await loginPage.ClickLogin();
        },
        new PageRunAndWaitForNavigationOptions
        {
            UrlString = "**/profile"
        });
    }

    [Test]
    [TestCase("vovaromaniyk@gmail.com", "maskaksdkass")]
    [TestCase("vasdovasdaroasdmaniayk@gmail.com", "asdasdj<asdsa")]
    public async Task Login_And_ClearData_When_IncorrectLoginOrPassword(string email, string password)
    {
        LoginPage loginPage = new LoginPage(Page);

        var res = await Page.RunAndWaitForResponseAsync(async () =>
        {
            await loginPage.Login(email, password);
            await loginPage.ClickLogin();

        }, resp => resp.Status == 400, new PageRunAndWaitForResponseOptions()
        {
            Timeout = 40000
        });

        Assert.AreEqual(res.Status, 400);
    }

    [Test]
    [TestCase("", "")]
    [TestCase("vasdovasdaroasdmaniayk", "asdasdj<asdsa")]
    public async Task Validate_Form_Must_Be_Not_Valid(string email, string password)
    {
        await Page.GotoAsync(_url, new PageGotoOptions { WaitUntil = WaitUntilState.NetworkIdle });

        LoginPage loginPage = new LoginPage(Page);

        Assert.AreEqual(await loginPage.FormIsValid(), false);
    }

    [Test]
    public async Task Click_To_ForgotPassword_NavigateTo_ForgotPassword_Page()
    {
        var forgotPassword = Page.GetByRole(AriaRole.Link, new PageGetByRoleOptions()
        {
            Name = "Forgot password"
        });

        await forgotPassword.ClickAsync();

        await Expect(Page).ToHaveURLAsync(new Regex(".*forgot-password"));
    }

    [Test]
    public async Task Click_To_SignUp_NavigateTo_SignUp_Page()
    {
        var forgotPassword = Page.GetByRole(AriaRole.Link, new PageGetByRoleOptions()
        {
            Name = "Sign up"
        });

        await forgotPassword.ClickAsync();

        await Expect(Page).ToHaveURLAsync(new Regex(".*registration"));
    }
}
