using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Policies;
using StudCity.API.ViewModels;
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

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
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
            return Ok(_mapper.Map<UserDto, CurrentUserViewModel>(await _userService.GetCurrentUserAsync()));
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
    /// <param name="userDto">user model.</param>
    /// <response code = '204'>User is updated.</response>
    /// <response code = '404'>User not wound.</response>
    /// <response code = '400'>Something went wrong.</response>
    [HttpPut]
    public async Task<IActionResult> UpdateCurrentUser([FromBody] UserDto userDto)
    {
        try
        {
            await _userService.UpdateUserInfoAsync(userDto);
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

    /// <summary>
    /// Get user by id.
    /// </summary>
    /// <param name="id">Guid Id of user.</param>
    /// <response code = '200'>User exist and return user model.</response>
    /// <response code = '404'>User not exist</response>
    /// <response code = '400'>Something went wrong. (Return model with error)</response>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        try
        {
            return Ok(await _userService.GetUserById(id));
        }
        catch (UserNotFoundException e)
        {
            return NotFound(new ErrorResponseModel(e.Message));
        }
    }
}
