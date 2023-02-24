using AutoMapper;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;

namespace StudCity.API.Mapping;

public class RegistrationCompleteMapperProfile : Profile
{
    public RegistrationCompleteMapperProfile()
    {
        CreateMap<RegistrationCompleteViewModel, RegistrationCompleteDto>();
    }
}
