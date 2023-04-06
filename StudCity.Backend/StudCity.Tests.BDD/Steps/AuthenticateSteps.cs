using System.Net;
using NUnit.Framework;
using StudCity.Tests.BDD.Drivers;
using StudCity.Tests.Pages;
using TechTalk.SpecFlow.Assist;

namespace StudCity.Tests.BDD.Steps;

[Binding]
public sealed class AuthenticateSteps
{
    private readonly Driver _driver;
    private readonly LoginPage _loginPage;
    private const string Url = "https://stud-city.azurewebsites.net/authenticate";

    public AuthenticateSteps(Driver driver)
    {
        _driver = driver;
        _loginPage = new LoginPage(_driver.Page);
    }

    [Given(@"I navigate to application")]
    public void GivenINavigateToApplication()
    {
        _driver.Page.GotoAsync(Url);
    }

    [Given(@"I fill following text fields")]
    public async Task GivenIFillFollowingTextFields(Table table)
    {
        dynamic data = table.CreateDynamicInstance();

        await _loginPage.Login((string)data.Email, (string)data.Password);
    }

    [Given(@"I Click submit button")]
    public async Task GivenIClickSubmitButton()
    {
        await _driver.Page.RunAndWaitForResponseAsync(async () =>
        {
            await _loginPage.ClickLogin();
        }, response => response.Status == 200);
    }

    [Then(@"I will be redirecting to profile page \(With /profile in route\)")]
    public void ThenIWillBeRedirectingToProfilePageWithProfileInRoute()
    {
        Assert.IsTrue(_driver.Page.Url.Contains("profile"));
    }
}
