using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers.Groups;

public class GetUserPublicsByIdOrTokenCommand : IRequest<List<PublicDto>>
{
    public GetUserPublicsByIdOrTokenCommand(Guid? userId)
    {
        UserId = userId;
    }

    public Guid? UserId { get; set; }
}

public class GetUserPublicsByIdOrTokenCommandHandler
    : IRequestHandler<GetUserPublicsByIdOrTokenCommand, List<PublicDto>>
{
    private readonly StudCityContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;

    public GetUserPublicsByIdOrTokenCommandHandler(StudCityContext db, IMapper mapper, ISecurityContext securityContext)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
    }

    public async Task<List<PublicDto>> Handle(GetUserPublicsByIdOrTokenCommand request, CancellationToken cancellationToken)
    {
        var userId = request.UserId ?? _securityContext.GetCurrentUserId();

        var publics = await _db.UserPublics.Where(x => x.UserId == userId)
            .Select(x => x.Public)
            .Include(x => x.Image)
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<PublicDto>>(publics);
    }
}
