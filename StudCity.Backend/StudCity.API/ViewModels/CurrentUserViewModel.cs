using StudCity.Core.DTOs;
using StudCity.Core.Enums;

namespace StudCity.API.ViewModels;

public class CurrentUserViewModel
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string FullName { get; set; }

    public string UserName { get; set; }

    public string Email { get; set; }

    public string Avatar { get; set; }

    public DateTime DateOfBirthday { get; set; }

    public string PhoneNumber { get; set; }

    public string Gender { get; set; }

    public string Role { get; set; }

    public SettingsViewModel Settings { get; set; }
}
