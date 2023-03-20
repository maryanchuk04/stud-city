using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IUserService
{
    Task<UserDto> GetCurrentUserAsync();

    Task UpdateUserInfoAsync(UserDto userDto);

    Task<UserDto> GetUserById(Guid id);

    Task<bool> ExistUserName(string userName);

    Task<PaginationModel<UserDto>> GetUsersAsync(FilterParameters filterParameters);
}
