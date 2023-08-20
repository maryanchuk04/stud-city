using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Extensions;
using StudCity.API.Policies;
using StudCity.API.ViewModels;
using StudCity.Application.CommandHandlers;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

/// <summary>
/// User controller.
/// </summary>
[ApiController]
[Authorize(Policy = PolicyNames.UserPolicyName)]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;
    private readonly IValidator<CurrentUserViewModel> _currentUserValidator;

    public UserController(
        IUserService userService,
        IMapper mapper,
        IValidator<CurrentUserViewModel> currentUserValidator,
        IMediator mediator)
    {
        _userService = userService;
        _mapper = mapper;
        _currentUserValidator = currentUserValidator;
        _mediator = mediator;
    }

    /// <summary>
    /// Get current user info.
    /// </summary>
    /// <response code = '200'>Return info about current user.</response>
    /// <response code = '404'>User not found.</response>
    /// <response code = '400'>Something went wrong.</response>
    [HttpGet]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            return Ok(_mapper.Map<CurrentUserViewModel>(await _userService.GetCurrentUserAsync()));
        }
        catch (UserNotFoundException e)
        {
            return NotFound(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Get user error", e.Message));
        }
    }

    /// <summary>
    /// Update current user.
    /// </summary>
    /// <param name="userViewModel">user model.</param>
    /// <response code = '204'>User is updated.</response>
    /// <response code = '404'>User not wound.</response>
    /// <response code = '400'>Something went wrong.</response>
    [HttpPut]
    public async Task<IActionResult> UpdateCurrentUser([FromBody] CurrentUserViewModel userViewModel)
    {
        var validationResult = await _currentUserValidator.ValidateAsync(userViewModel);
        if (!validationResult.IsValid)
        {
            return  BadRequest(new ErrorResponseModel(validationResult.GetFailureMessage()));
        }

        try
        {
            if (await _userService.ExistUserName(userViewModel.UserName))
            {
                return  BadRequest(new ErrorResponseModel($"{userViewModel.UserName} user name is already taken!"));
            }

            await _userService.UpdateUserInfoAsync(_mapper.Map<CurrentUserViewModel, UserDto>(userViewModel));
            return NoContent();
        }
        catch (UserNotFoundException e)
        {
            return NotFound(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Update user error", e.Message));
        }
    }

    [HttpPatch("settings")]
    public async Task<ActionResult> UpdateUserSettings(SettingsViewModel settingsViewModel)
    {
        try
        {
            var result =
                await _mediator.Send(new UpdateUserSettingsCommand(_mapper.Map<SettingsDto>(settingsViewModel)));

            return Ok(_mapper.Map<SettingsViewModel>(result));
        }
        catch (UserNotFoundException e)
        {
            return NotFound(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Update user error", e.Message));
        }
    }

    /// <summary>
    /// Get user by id.
    /// </summary>
    /// <param name="id">Guid Id of user.</param>
    /// <response code = '200'>User exist and return user model.</response>
    /// <response code = '404'>User not exist</response>
    /// <response code = '400'>Something went wrong. (Return model with error)</response>
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
        try
        {
            return Ok(_mapper.Map<UserDto, UserViewModel>(await _userService.GetUserById(id)));
        }
        catch (UserNotFoundException e)
        {
            return NotFound(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return NotFound(new ErrorResponseModel("Sorry, something went wrong!", e.Message));
        }
    }

    /// <summary>
    /// Get all users
    /// </summary>
    /// <param name="filter">Search user parameters</param>
    /// <response code = '200'>User exist and return user model.</response>
    /// <response code = '400'>Something went wrong. (Return model with error)</response>
    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> SearchUsers([FromQuery] FilterParameters filter)
    {
        try
        {
            var users = await _userService.GetUsersAsync(filter);
            var result = new IndexViewModel<UserShortInfo>
            {
                Items = _mapper.Map<UserShortInfo[]>(users.Items),
                PageViewModel = new PageViewModel(users.Count, filter.Page, filter.PageSize)
            };

            return Ok(result);
        }
        catch (Exception e)
        {
            return NotFound(new ErrorResponseModel("Sorry, something went wrong!", e.Message));
        }
    }
}
