using Microsoft.EntityFrameworkCore;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class TeachersStoreService : ITeachersStoreService
{
    private readonly StudCityContext _context;

    public TeachersStoreService(StudCityContext context)
    {
        _context = context;
    }

    public async Task<bool> IsTeacher(string email)
    {
        return await _context.TeachersStore.AnyAsync(x => x.Email == email);
    }
}
