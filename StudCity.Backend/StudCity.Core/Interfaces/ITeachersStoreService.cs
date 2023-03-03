namespace StudCity.Core.Interfaces;

public interface ITeachersStoreService
{
    Task<bool> IsTeacher(string email);
}
