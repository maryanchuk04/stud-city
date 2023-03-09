using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using Role = StudCity.Core.Enums.Role;

namespace StudCity.API.Mapping;

public class UserMapperProfile : Profile
{
    public UserMapperProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(x => x.Email, opts => opts.MapFrom(src => src.Account.Email))
            .ForMember(x => x.Role, opts => opts.MapFrom(src => RoleResolver(src.Account.AccountRoles)))
            .ForPath(x => x.Settings.BackgroundImage, opts => opts.MapFrom(src => src.Settings.BackgroundImage == null ? string.Empty : src.Settings.BackgroundImage.ImageUrl))
            .ForMember(x => x.Avatar, opts => opts.MapFrom(src => src.Image.ImageUrl));
    }

    private static string RoleResolver(IEnumerable<AccountRole> accountRoles)
    {
        return accountRoles.First(x => x.RoleId != Role.User).RoleId.ToString();
    }
}
