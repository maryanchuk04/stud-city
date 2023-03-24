using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class MessageMapperProfile : Profile
{
    public MessageMapperProfile()
    {
        CreateMap<Message, MessageDto>()
            .ForMember(x => x.When, opts => opts.MapFrom(x => x.When.ToString("G")));

        CreateMap<Message, MessagePreviewDto>()
            .ForMember(x => x.When, opts => opts.MapFrom(x => x.When.ToString("G")));
    }
}
