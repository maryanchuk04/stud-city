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
            .ForPath(x => x.Settings.Language, opts => opts.MapFrom(src => src.Settings.Language))
            .ForPath(x => x.Settings.Theme, opts => opts.MapFrom(src => src.Settings.Theme))
            .ForMember(x => x.Email, opts => opts.MapFrom(src => src.Account.Email))
            .ForMember(x => x.Role, opts => opts.MapFrom(src => RoleResolver(src.Account.AccountRoles)))
            .ForPath(x => x.Settings.BackgroundImage, opts => opts.MapFrom(src => src.Settings.BackgroundImage == null ? string.Empty : src.Settings.BackgroundImage.ImageUrl))
            .ForMember(x => x.Avatar, opts => opts.MapFrom(src => src.Image.ImageUrl));

        CreateMap<UserDto, CurrentUserViewModel>()
            .ForMember(x => x.Settings, opts => opts.MapFrom(x => MapSettings(x.Settings)))
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => GenderConverter(src.Gender)));

        CreateMap<CurrentUserViewModel, UserDto>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => Enum.Parse<Gender>(src.Gender, true)));

        CreateMap<UserDto, UserViewModel>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => GenderConverter(src.Gender)))
            .ForMember(x => x.BackgroundImage, opts => opts.MapFrom(src => src.Settings.BackgroundImage));

        CreateMap<UserDto, UserShortInfo>()
            .ForMember(x => x.Role, opts => opts.MapFrom(src => src.Role));

        CreateMap<User, UserPreviewDto>()
            .ForMember(dest => dest.Image, opts => opts.MapFrom(src => src.Image.ImageUrl));
    }

    private static string RoleResolver(IEnumerable<AccountRole> accountRoles)
    {
        return accountRoles.First(x => x.RoleId != Role.User).RoleId.ToString();
    }

    private static SettingsViewModel MapSettings(SettingsDto settingsDto)
    {
        var theme = "light";
        var language = "en";

        if (settingsDto.Theme.HasValue)
        {
            theme = settingsDto.Theme == Theme.Light ? "light" : "dark";
        }

        if (settingsDto.Language.HasValue)
        {
            language = settingsDto.Language == InterfaceLanguage.en ? "en" : "ua";
        }

        return new SettingsViewModel(theme, language, settingsDto.BackgroundImage);
    }


    private static string MapLanguage(InterfaceLanguage? language)
    {
        return language switch
        {
            InterfaceLanguage.en => "en",
            InterfaceLanguage.ua => "ua",
            _ => "ua"
        };
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
