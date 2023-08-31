using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Entities;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers.Groups;

public class CreatePublicCommand : IRequest<PublicDto>
{
    public CreatePublicCommand(
        IEnumerable<Guid> usersIds,
        string name,
        string description,
        string image,
        bool isPrivate,
        string codeWord)
    {
        UsersIds = usersIds;
        Name = name;
        Description = description;
        Image = image;
        IsPrivate = isPrivate;
        CodeWord = codeWord;
    }

    public IEnumerable<Guid> UsersIds { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Image { get; set; }

    public bool IsPrivate { get; set; }

    public string CodeWord { get; set; }
}

public class CreatePublicCommandHandler : IRequestHandler<CreatePublicCommand, PublicDto>
{
    private readonly StudCityContext _db;
    private readonly ISecurityContext _securityContext;
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public CreatePublicCommandHandler(
        StudCityContext db,
        ISecurityContext securityContext,
        IMapper mapper,
        IMediator mediator)
    {
        _db = db;
        _securityContext = securityContext;
        _mapper = mapper;
        _mediator = mediator;
    }

    public async Task<PublicDto> Handle(CreatePublicCommand request, CancellationToken cancellationToken)
    {
        var ownerId = _securityContext.GetCurrentUserId();
        var publicId = Guid.NewGuid();

        var pb = new Public
        {
            Id = publicId,
            Name = request.Name,
            Description = request.Description,
            CodeWord = request.CodeWord,
            IsPrivate = request.IsPrivate,
            Image = new Image(request.Image),
            UserId = ownerId,
            PublicAdmins = new List<PublicAdmin>(),
            UserPublics = new List<UserPublic>(),
            Publications = new List<Publication>()
        };

        pb.PublicAdmins.Add(new PublicAdmin { PublicId = publicId, UserId = ownerId });
        pb.UserPublics.Add(new UserPublic { PublicId = publicId, UserId = ownerId });

        foreach (var userId in request.UsersIds)
        {
            pb.UserPublics.Add(new UserPublic { PublicId = publicId, UserId = userId });
        }

        await _db.Publics.AddAsync(pb, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return await _mediator.Send(new GetPublicByIdCommand(publicId), cancellationToken);
    }
}
