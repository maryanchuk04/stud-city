using StudCity.Core.DTOs;

namespace StudCity.Core.Interfaces;

public interface ITeachersStoreService
{
    Task<bool> IsTeacherAsync(string email);

    Task<IEnumerable<TeachersStoreDto>> GetTeachersStoreAsync();

    Task InsertAsync(TeachersStoreDto teachersStoreDto);
}
