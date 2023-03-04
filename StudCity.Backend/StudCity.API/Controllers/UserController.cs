using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

/// <summary>
/// User API controller.
/// </summary>
[ApiController]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Update user information.
    /// </summary>
    /// <param name="user">Model that contains user's data.</param>
    /// <response code ='204'>When informations updated successfully.</response>
    [Authorize]
    [HttpPut("update-info")]
    public async Task<IActionResult> Put([FromBody] UserDto user)
    {
        try
        {
            await _userService.UpdateUserInformation(user);
            return NoContent();
        }
        catch (InvalidUsernameException e)
        {
            return BadRequest(e.Message);
        }
        catch (InvalidPhoneNumberException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Error Updating User Information.", e.Message));
        }
    }
}
