using FluentValidation;
using StudCity.API.Validation;
using StudCity.API.ViewModels;

namespace StudCity.API.Extensions;

public static class WebAppBuilderExtension
{
    public static void ConfigureValidation(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IValidator<CurrentUserViewModel>, CurrentUserValidator>();
    }
}
