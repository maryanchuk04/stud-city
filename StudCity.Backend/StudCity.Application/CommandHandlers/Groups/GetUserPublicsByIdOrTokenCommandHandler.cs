using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
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
    private readonly ILogger<GetUserPublicsByIdOrTokenCommandHandler> _logger;

    public GetUserPublicsByIdOrTokenCommandHandler(
        StudCityContext db,
        IMapper mapper,
        ISecurityContext securityContext,
        ILogger<GetUserPublicsByIdOrTokenCommandHandler> logger)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
        _logger = logger;
    }

    public async Task<List<PublicDto>> Handle(GetUserPublicsByIdOrTokenCommand request,
        CancellationToken cancellationToken)
    {
        Guid? userId = null;
        try
        {
            userId = request.UserId ?? _securityContext.GetCurrentUserId();
        }
        catch (UserNotFoundException)
        {
            _logger.LogWarning("Not provided necessary data for request");
            throw new ArgumentException("Not provided TOKEN or ID of User");
        }

        var publics = await _db.UserPublics.Where(x => x.UserId == userId)
            .AsSplitQuery()
            .Include(x => x.Public)
            .ThenInclude(x => x.User)
            .ThenInclude(u => u.Image)
            .Include(x => x.Public)
            .ThenInclude(x => x.Image)
            .Select(x => x.Public)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<PublicDto>>(publics);
    }
}
