using System.Text.RegularExpressions;
using FluentValidation;
using StudCity.API.ViewModels;

namespace StudCity.API.Validation;

public class CurrentUserValidator : AbstractValidator<CurrentUserViewModel>
{
    public CurrentUserValidator()
    {
        RuleFor(x => x.UserName).NotNull().NotEmpty().WithMessage("User number is not valid");
        RuleFor(x => x.LastName).NotNull().NotEmpty().WithMessage("Last name is not valid");
        RuleFor(x => x.FirstName).NotNull().NotEmpty().WithMessage("First name is not valid");
        RuleFor(x => x.Email).NotNull().NotEmpty().EmailAddress().WithMessage("Email is not valid");
        RuleFor(x => x.DateOfBirthday).Must(ValidateDateOfBirthday).WithMessage("Date of birth is not valid");
        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("PhoneNumber must be not empty")
            .MinimumLength(13).WithMessage("PhoneNumber in not valid")
            .MaximumLength(13).WithMessage("PhoneNumber is not valid")
            .Matches(new Regex(@"^\+(?:[0-9]●?){6,14}[0-9]$")).WithMessage("PhoneNumber is not valid");
    }

    private static bool ValidateDateOfBirthday(DateTime dateTime)
    {
        return dateTime <= DateTime.Now;
    }
}
