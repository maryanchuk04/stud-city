using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Enums;

namespace StudCity.API.Mapping;

public class RoomMapperProfile : Profile
{
    public RoomMapperProfile()
    {
        CreateMap<Room, RoomDto>()
            .ForMember(x => x.Messages, opts => opts.MapFrom(x => x.Messages))
            .ForMember(x => x.Users, opts => opts.MapFrom(src => src.UserRooms.Select(x => x.User)))
            .ForMember(x => x.Image, opts => opts.MapFrom(src => src.Image.ImageUrl));

        CreateMap<Room, RoomPreviewDto>()
            .ForMember(x => x.Message, opts => opts.MapFrom(src => src.Messages.LastOrDefault()));
    }
}
