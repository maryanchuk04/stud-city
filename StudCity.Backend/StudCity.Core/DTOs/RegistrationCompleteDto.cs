using StudCity.Core.Enums;

namespace StudCity.Core.DTOs;

public class RegistrationCompleteDto
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string UserName { get; set; }

    public Gender Gender { get; set; }

    public string PhoneNumber { get; set; }

    public string Avatar { get; set; }

    public DateTime Birthday { get; set; }

    public List<Guid> Groups { get; set; }

    public InterfaceLanguage Language { get; set; }

    public Theme Theme { get; set; }
}
