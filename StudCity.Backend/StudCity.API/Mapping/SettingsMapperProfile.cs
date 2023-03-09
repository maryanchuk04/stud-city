using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class SettingsMapperProfile : Profile
{
    public SettingsMapperProfile()
    {
        CreateMap<Settings, SettingsDto>();
    }
}
