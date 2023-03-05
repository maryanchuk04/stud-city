using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class TeacherStoreMapperProfile : Profile
{
    public TeacherStoreMapperProfile()
    {
        CreateMap<TeacherStore, TeachersStoreDto>();
        CreateMap<TeachersStoreDto, TeacherStore>();
    }
}
