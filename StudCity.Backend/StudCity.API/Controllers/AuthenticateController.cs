using Microsoft.AspNetCore.Mvc;
using StudCity.API.ViewModels;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

/// <summary>
/// Authenticate user API controller.
/// </summary>
[ApiController]
[Route("[controller]")]
public class AuthenticateController : ControllerBase
{
    private readonly IAuthenticateService _authenticateService;

    /// <summary>
    /// Authenticate DI.
    /// </summary>
    /// <param name="authenticateService">DI auth service.</param>
    public AuthenticateController(IAuthenticateService authenticateService)
    {
        _authenticateService = authenticateService;
    }

    /// <summary>
    /// Registration begin.
    /// Method create new account and send confirmation token to email.
    /// </summary>
    /// <param name="authenticateViewModel">This model contain email and password.</param>
    /// <response code='200'>When account created.</response>
    /// <response code='400'>When something went wrong.</response>
    [HttpPost("/registration")]
    public async Task<IActionResult> RegistrationBegin([FromBody] AuthenticateViewModel authenticateViewModel)
    {
        try
        {
            if (await _authenticateService.CanRegisterAsync(authenticateViewModel.Email))
            {
                return BadRequest(new ErrorResponseModel("Account is already exist"));
            }

            var accountId = await _authenticateService.RegistrationBeginAsync(authenticateViewModel.Email, authenticateViewModel.Password);

            return Ok(new { accountId });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    /// <summary>
    /// This method verify email confirmation token and authenticate new user.
    /// </summary>
    /// <param name="id">Account id.</param>
    /// <param name="token">confirmation token from mail.</param>
    /// <returns>Ok.</returns>
    [HttpPut("/verity-token/{id}/{token}")]
    public async Task<IActionResult> ConfirmationAuthenticate(Guid id, string token)
    {
        try
        {
            var responseModel = await _authenticateService.AuthenticateAsync(id, token);
            return Ok(new { Token = responseModel.JwtToken });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(e.Message);
        }
    }
}
