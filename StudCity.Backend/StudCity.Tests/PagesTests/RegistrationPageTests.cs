using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using StudCity.Tests.Pages;

namespace StudCity.Tests.PagesTests;


[TestFixture]
public class RegistrationPageTests : PageTest
{
    private RegistrationPage _registrationPage;

    [SetUp]
    public async Task SetUp()
    {
        var baseUrl = TestContext.Parameters["WebAppUrl"]
                      ?? throw new Exception("WebAppUrl is not configured as a parameter.");

        var url = $"{baseUrl}/registration";

        await Page.GotoAsync(url, new PageGotoOptions { WaitUntil = WaitUntilState.NetworkIdle });
        _registrationPage = new RegistrationPage(Page);
    }

    [Test]
    public async Task Register_Should_Return_400_Error()
    {
        var res = await Page.RunAndWaitForResponseAsync(async () =>
        {
            await _registrationPage.Register("lion20914king@gmail.com", "Maks-010104", "Maks-010104");
        }, resp => resp.Status == 400);

        Assert.That(res.Status, Is.EqualTo(400));
    }

    [Test]
    public async Task SignInLabel_Should_Redirect_ToAuthenticatePage()
    {
        var authLink = Page.GetByRole(AriaRole.Link, new PageGetByRoleOptions { Name = "Sign in" });

        await authLink.ClickAsync();

        await Expect(Page).ToHaveURLAsync(new Regex("authenticate*"));
    }

    [Test]
    [TestCase("lion20914king", "password", "password")]
    [TestCase("lion20914king@gmail.com", "drowssap", "password")]
    public async Task SubmitButton_Should_BeDisabled_When_NotValidData(string email, string password, string confirmPassword)
    {
        await _registrationPage.FillFormAsync(email, password, confirmPassword);

        Assert.IsTrue(await _registrationPage.SubmitIsDisabled());
    }
}
