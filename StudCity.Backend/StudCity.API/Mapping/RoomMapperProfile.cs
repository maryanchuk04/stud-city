using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class RoomMapperProfile : Profile
{
    public RoomMapperProfile()
    {
        CreateMap<Room, RoomDto>()
            .ForMember(x => x.Users, opts => opts.MapFrom(src => src.UserRooms.Select(x => x.User)));
        CreateMap<Room, RoomPreviewDto>()
            .ForMember(x => x.Message, opts => opts.MapFrom(src => src.Messages.LastOrDefault()));
    }
}
