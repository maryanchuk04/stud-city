using AutoMapper;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Enums;

namespace StudCity.API.Mapping;

public class RegistrationCompleteMapperProfile : Profile
{
    public RegistrationCompleteMapperProfile()
    {
        CreateMap<RegistrationCompleteViewModel, RegistrationCompleteDto>()
            .ForMember(x => x.Gender, opts => opts.MapFrom(src => Enum.Parse<Gender>(src.Gender, true)))
            .ForMember(x => x.Role, opts => opts.MapFrom(src => Enum.Parse<Role>(src.Role, true)));
    }
}
