using AutoMapper;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;

namespace StudCity.API.Mapping;

public class AccountMapperProfile : Profile
{
    public AccountMapperProfile()
    {
        CreateMap<Account, AccountDto>();
    }
}
