using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IUserService
{
    Task UpdateUserInformation(UserDto user);
}
