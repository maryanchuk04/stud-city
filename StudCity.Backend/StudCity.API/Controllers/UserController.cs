using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Policies;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

[ApiController]
[Authorize(Policy = PolicyNames.UserPolicyName)]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            return Ok(await _userService.GetCurrentUserAsync());
        }
        catch (UserNotFoundException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Get user error", e.Message));
        }
    }

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
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Update user error", e.Message));
        }
    }
}
