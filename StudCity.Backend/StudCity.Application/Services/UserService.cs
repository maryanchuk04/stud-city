using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class UserService : IUserService
{
    private readonly ISecurityContext _securityContext;
    private readonly StudCityContext _context;
    private readonly IMapper _mapper;

    public UserService(ISecurityContext securityContext, StudCityContext context, IMapper mapper)
    {
        _securityContext = securityContext;
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDto> GetCurrentUserAsync()
    {
        return _mapper.Map<User, UserDto>(await GetUserAsync());
    }

    public async Task UpdateUserInfoAsync(UserDto userDto)
    {
        var user = await GetUserAsync();

        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;
        user.FullName = $"{userDto.FirstName} {userDto.LastName}";
        user.PhoneNumber = userDto.PhoneNumber;
        user.DateOfBirthday = userDto.DateOfBirthday;
        user.Settings.Language = userDto.Settings.Language;
        user.Settings.Theme = userDto.Settings.Theme;
        user.Image.ImageUrl = userDto.Avatar;
        if (user.Settings.BackgroundImage == null)
        {
            user.Settings.BackgroundImage = new Image(userDto.Settings.BackgroundImage);
        }
        else
        {
            user.Settings.BackgroundImage.ImageUrl = userDto.Settings.BackgroundImage;
        }

        user.Gender = userDto.Gender;

        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<UserDto> GetUserById(Guid id)
    {
        var user = await _context.Users
            .Include(x => x.Image)
            .Include(x => x.Account)
                .ThenInclude(x => x.AccountRoles)
            .Include(x => x.Settings)
                .ThenInclude(x => x.BackgroundImage)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (user == null)
        {
            throw new UserNotFoundException();
        }

        return _mapper.Map<UserDto>(user);
    }

    // True if user already exist and this is not current user
    public async Task<bool> ExistUserName(string userName)
    {
        return await _context.Users
            .AnyAsync(x => x.UserName == userName && x.Id != _securityContext.GetCurrentUserId());
    }

    public async Task<PaginationModel<UserDto>> GetUsersAsync(FilterParameters filterParameters)
    {
        var usersQuery = _context.Users.AsQueryable();

        usersQuery = !string.IsNullOrEmpty(filterParameters.SearchWord)
            ? usersQuery.Where(x => x.FullName.Contains(filterParameters.SearchWord) 
                                    || x.UserName.Contains(filterParameters.SearchWord))
            : usersQuery;

        var count = usersQuery.Count();

        var users = await usersQuery
            .Include(x => x.Account)
            .ThenInclude(x => x.AccountRoles)
            .ThenInclude(x => x.Role)
            .Include(x => x.Image)
            .Skip((filterParameters.Page - 1) * filterParameters.PageSize)
            .Take(filterParameters.PageSize)
            .ToListAsync();

        return new PaginationModel<UserDto>
        {
            Items = _mapper.Map<UserDto[]>(users),
            Count = count,
        };
    }

    private async Task<User> GetUserAsync()
    {
        var userId = _securityContext.GetCurrentUserId();

        if (await _context.Users.AnyAsync(x => x.Id == userId))
        {
            return await _context.Users
                .Include(x => x.Image)
                .Include(x => x.Account)
                .ThenInclude(x => x.AccountRoles)
                .Include(x => x.Settings)
                .ThenInclude(x => x.BackgroundImage)
                .FirstAsync(x => x.Id == userId);
        }

        throw new UserNotFoundException();
    }
}
