using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Requests;
using StudCity.API.ViewModels;
using StudCity.Application.CommandHandlers.Groups;

namespace StudCity.API.Controllers;

[ApiController]
[Route("public")]
public class PublicController : ControllerBase
{
    private readonly IMediator _mediator;

    public PublicController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetPublicAsync()
    {
        try
        {
            var result = await _mediator.Send(new GetPublicsCommand());

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Something went wrong during Getting all Public`s", e.Message));
        }
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetPublicAsync(Guid id)
    {
        try
        {
            var result = await _mediator.Send(new GetPublicByIdCommand(id));

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Something went wrong during Getting Public", e.Message));
        }
    }

    [HttpGet]
    [Route("user")]
    public async Task<IActionResult> GetUserPublicById([FromQuery] Guid? userId)
    {
        try
        {
            var result = await _mediator.Send(new GetUserPublicsByIdOrTokenCommand(userId));

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Something went wrong during Getting Public", e.Message));
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreatePublicAsync([FromBody] CreatePublicRequest request)
    {
        try
        {
            var command = new CreatePublicCommand(
                request.UsersIds,
                request.Name,
                request.Description,
                request.Image,
                request.IsPrivate,
                request.CodeWord);

            var result = await _mediator.Send(command);

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Something went wrong during Creation new Public", e.Message));
        }
    }
}
