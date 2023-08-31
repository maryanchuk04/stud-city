using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers.Groups;

public class GetPublicsCommand : IRequest<List<PublicDto>> { }

public class GetPublicsCommandHandler : IRequestHandler<GetPublicsCommand, List<PublicDto>>
{
    private readonly StudCityContext _db;
    private readonly IMapper _mapper;

    public GetPublicsCommandHandler(StudCityContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<List<PublicDto>> Handle(GetPublicsCommand request, CancellationToken cancellationToken)
    {
        var publics = await _db.Publics
            .AsSplitQuery()
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .Include(x => x.UserPublics)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .Include(x => x.PublicAdmins)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .Include(x => x.Publications)
            .ThenInclude(x => x.Images)
            .Include(x => x.Image)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<PublicDto>>(publics);
    }
}
