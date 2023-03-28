using Microsoft.Playwright.NUnit;

namespace StudCity.Tests.Configuration;

public class PagesBaseConfiguration : PageTest
{
    protected static string WebAppUrl;

    public void Init()
    {
        WebAppUrl = TestContext.Parameters["WebAppUrl"]
                    ?? throw new Exception("WebAppUrl is not configured as a parameter.");
    }
}
