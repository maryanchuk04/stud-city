using AutoMapper;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Enums;
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

        CreateMap<UserDto, CurrentUserViewModel>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => GenderConverter(src.Gender)));

        CreateMap<CurrentUserViewModel, UserDto>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => Enum.Parse<Gender>(src.Gender, true)));

        CreateMap<UserDto, UserViewModel>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => GenderConverter(src.Gender)))
            .ForMember(x => x.BackgroundImage, opts => opts.MapFrom(src => src.Settings.BackgroundImage));

    }

    private static string RoleResolver(IEnumerable<AccountRole> accountRoles)
    {
        return accountRoles.First(x => x.RoleId != Role.User).RoleId.ToString();
    }

    private static string GenderConverter(Gender gender)
    {
        return gender switch
        {
            Gender.Male => "Male",
            Gender.Female => "Female",
            Gender.Other => "Other",
            _ => throw new ArgumentOutOfRangeException(nameof(gender), gender, null)
        };
    }
}
