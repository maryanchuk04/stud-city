using AutoMapper;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Enums;

namespace StudCity.API.Mapping;

public class SettingsMapperProfile : Profile
{
    private static readonly List<string> LanguageCodes = new() {"ua", "en"};
    private static readonly List<string> InterfaceModes = new() {"light", "dark"};

    public SettingsMapperProfile()
    {
        CreateMap<Settings, SettingsDto>()
            .ForMember(x => x.BackgroundImage, opt => opt.MapFrom(x => x.BackgroundImage.ImageUrl))
            .ReverseMap();
        CreateMap<SettingsViewModel, SettingsDto>()
            .ForMember(x => x.Language, opts => opts.MapFrom(src => MapLanguage(src.Language)))
            .ForMember(x => x.Theme, opts => opts.Ignore())
            .ForMember(x => x.BackgroundImage, opts => opts.MapFrom(src => src.BackgroundImage))
            .ReverseMap();
    }

    private static InterfaceLanguage MapLanguage(string languageCode)
    {
        return (InterfaceLanguage) LanguageCodes.IndexOf(languageCode);
    }

    private static Theme MapTheme(string themeCode)
    {
        return (Theme) InterfaceModes.IndexOf(themeCode);
    }
}
