using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IUserService
{
    Task<UserDto> GetCurrentUserAsync();

    Task UpdateUserInfoAsync(UserDto userDto);
}
