using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;

namespace StudCity.Application.CommandHandlers;

public class UpdateUserSettingsCommand : IRequest<SettingsDto>
{
    public UpdateUserSettingsCommand(SettingsDto settings)
    {
        Settings = settings;
    }

    public SettingsDto Settings { get; }
}

public class UpdateUserSettingsCommandHandler : IRequestHandler<UpdateUserSettingsCommand, SettingsDto>
{
    private readonly StudCityContext _db;
    private readonly ISecurityContext _securityContext;
    private readonly IMapper _mapper;

    public UpdateUserSettingsCommandHandler(StudCityContext db, ISecurityContext securityContext, IMapper mapper)
    {
        _db = db;
        _securityContext = securityContext;
        _mapper = mapper;
    }

    public async Task<SettingsDto> Handle(UpdateUserSettingsCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.Users
            .Include(u => u.Settings)
            .ThenInclude(x => x.BackgroundImage)
            .AsSingleQuery()
            .SingleOrDefaultAsync(u => u.Id == _securityContext.GetCurrentUserId(), cancellationToken);

        if (user is null)
        {
            throw new UserNotFoundException();
        }

        if (request.Settings.Language.HasValue)
        {
            user.Settings.Language = request.Settings.Language.Value;
        }

        if (request.Settings.Theme.HasValue)
        {
            user.Settings.Theme = request.Settings.Theme.Value;
        }

        if (!string.IsNullOrEmpty(request.Settings.BackgroundImage))
        {
            user.Settings.BackgroundImage.ImageUrl = request.Settings.BackgroundImage;
        }

        _db.Users.Update(user);

        await _db.SaveChangesAsync(cancellationToken);

        return _mapper.Map<SettingsDto>(user.Settings);
    }
}
