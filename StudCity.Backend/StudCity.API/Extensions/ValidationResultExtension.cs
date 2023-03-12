using FluentValidation.Results;

namespace StudCity.API.Extensions;

public static class ValidationResultExtension
{
    public static string GetFailureMessage(this ValidationResult validationResult)
    {
        return !validationResult.IsValid
            ?  string.Join("\n", validationResult.Errors.Select(x => x.ErrorMessage).Distinct())
            : string.Empty;
    }
}
