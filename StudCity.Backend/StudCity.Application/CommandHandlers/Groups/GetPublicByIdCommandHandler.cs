using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers.Groups;

public class GetPublicByIdCommand : IRequest<PublicDto>
{
    public GetPublicByIdCommand(Guid publicId)
    {
        PublicId = publicId;
    }
    public Guid? PublicId { get; set; }
}

public class GetPublicByIdCommandHandler : IRequestHandler<GetPublicByIdCommand, PublicDto>
{
    private readonly StudCityContext _db;
    private readonly IMapper _mapper;
    
    public GetPublicByIdCommandHandler(StudCityContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<PublicDto> Handle(GetPublicByIdCommand request, CancellationToken cancellationToken)
    {
        var pb = await _db.Publics
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
            .SingleOrDefaultAsync(x => x.Id == request.PublicId, cancellationToken);

        return _mapper.Map<PublicDto>(pb);
    }
}
