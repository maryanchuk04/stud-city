using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class PublicMapperProfile : Profile
{
    public PublicMapperProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(x => x.Email, opts => opts.MapFrom(src => src.Account.Email))
            .ForMember(x => x.Avatar, opts => opts.MapFrom(src => src.Image.ImageUrl));
        
        CreateMap<Public, PublicDto>()
            .AfterMap((src, dest, context) =>
            {
                dest.Users = context.Mapper.Map<IEnumerable<UserDto>>(src.UserPublics.Select(x => x.User));
                dest.Admins = context.Mapper.Map<IEnumerable<UserDto>>(src.PublicAdmins.Select(x => x.User));
                dest.Owner = context.Mapper.Map<UserDto>(src.User);
            })
            .ForMember(x => x.Image, src => src.MapFrom(x => x.Image.ImageUrl ?? string.Empty));
    }
}
