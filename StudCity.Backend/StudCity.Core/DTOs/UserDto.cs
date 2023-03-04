using StudCity.Core.Enums;

namespace StudCity.Core.DTOs;
public class UserDto
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string FullName { get; set; }

    public string UserName { get; set; }

    public DateTime DateOfBirthday { get; set; }

    public string PhoneNumber { get; set; }

    public Gender Gender { get; set; }

}

