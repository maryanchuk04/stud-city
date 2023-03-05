using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.Services;

public class TeachersStoreService : ITeachersStoreService
{
    private readonly StudCityContext _context;
    private readonly IMapper _mapper;

    public TeachersStoreService(StudCityContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> IsTeacherAsync(string email)
    {
        return await _context.TeachersStore.AnyAsync(x => x.Email == email);
    }

    public async Task<IEnumerable<TeachersStoreDto>> GetTeachersStoreAsync()
    {
        if (!await _context.TeachersStore.AnyAsync())
        {
            return new List<TeachersStoreDto>();
        }

        var teacherStore = await _context.TeachersStore.ToListAsync();

        return _mapper.Map<List<TeacherStore>, IEnumerable<TeachersStoreDto>>(teacherStore);
    }

    public async Task InsertAsync(TeachersStoreDto teachersStoreDto)
    {
        var newTeacher = _mapper.Map<TeacherStore>(teachersStoreDto);

        await _context.TeachersStore.AddAsync(newTeacher);

        await _context.SaveChangesAsync();
    }
}
