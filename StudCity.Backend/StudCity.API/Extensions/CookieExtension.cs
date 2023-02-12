using StudCity.Core.DTOs;

namespace StudCity.API.Extensions;

public static class CookieExtension
{
    public static void SetTokenCookie(this HttpContext context, AuthenticateResponseModel model)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddDays(7),
            Secure = true,
        };

        context.Response.Cookies.Delete("refreshToken");
        context.Response.Cookies.Append("refreshToken", model.RefreshToken, cookieOptions);
    }

    public static void DeleteRefreshToken(this HttpContext context)
    {
        context.Response.Cookies.Delete("refreshToken");
    }
}
