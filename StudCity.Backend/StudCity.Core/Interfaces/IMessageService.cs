using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface IMessageService
{
    Task<MessageDto> Send();
}
