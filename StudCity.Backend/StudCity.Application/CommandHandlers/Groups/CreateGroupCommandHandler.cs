using MediatR;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers.Groups;

public class CreateGroupCommand : IRequest
{
    
}

public class CreateGroupCommandHandler : IRequestHandler<CreateGroupCommand>
{
    private readonly StudCityContext _db;

    public CreateGroupCommandHandler(StudCityContext db)
    {
        _db = db;
    }

    public async Task Handle(CreateGroupCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
