using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Extensions;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Exceptions;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

/// <summary>
/// Authenticate user API controller.
/// </summary>
[ApiController]
[Route("/authenticate")]
public class AuthenticateController : ControllerBase
{
    private readonly IAuthenticateService _authenticateService;
    private readonly IMapper _mapper;

    /// <summary>
    /// Authenticate DI.
    /// </summary>
    /// <param name="authenticateService">DI auth service.</param>
    /// <param name="mapper">Automapper.</param>
    public AuthenticateController(IAuthenticateService authenticateService, IMapper mapper)
    {
        _authenticateService = authenticateService;
        _mapper = mapper;
    }

    /// <summary>
    /// Registration begin.
    /// Method create new account and send confirmation token to email.
    /// </summary>
    /// <param name="authenticateViewModel">This model contain email and password.</param>
    /// <response code='200'>When account created.</response>
    /// <response code='400'>When something went wrong.</response>
    [HttpPost("registration")]
    public async Task<IActionResult> RegistrationBegin([FromBody] AuthenticateViewModel authenticateViewModel)
    {
        try
        {
            if (!await _authenticateService.CanRegisterAsync(authenticateViewModel.Email))
            {
                return BadRequest(new ErrorResponseModel("Account is already exist"));
            }

            var accountId = await _authenticateService.RegistrationBeginAsync(
                authenticateViewModel.Email, authenticateViewModel.Password);
            return Ok(new { accountId });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Authenticate error", e.Message));
        }
    }

    /// <summary>
    /// This method verify email confirmation token and authenticate new user.
    /// </summary>
    /// <param name="id">Account id.</param>
    /// <param name="token">confirmation token from mail.</param>
    /// <returns>Ok.</returns>
    [HttpPut("verify-token/{id}/{token}")]
    public async Task<IActionResult> ConfirmationAuthenticate(Guid id, string token)
    {
        try
        {
            var responseModel = await _authenticateService.AuthenticateAsync(id, token);
            HttpContext.SetTokenCookie(responseModel);

            return Ok(new { Token = responseModel.JwtToken });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Confirm registration error", e.Message));
        }
    }

    /// <summary>
    /// Authenticate user by email and password.
    /// </summary>
    /// <param name="authenticateViewModel">Authenticate model (Email and Password).</param>
    /// <response code ='200'>New JWT token.</response>
    /// <response code ='400'>Error with message.</response>
    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateViewModel authenticateViewModel)
    {
        try
        {
            var responseModel = await _authenticateService.AuthenticateAsync(
                authenticateViewModel.Email,
                authenticateViewModel.Password);
            HttpContext.SetTokenCookie(responseModel);

            return Ok(new { Token = responseModel.JwtToken });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Authenticate exceptions", e.Message));
        }
    }

    /// <summary>
    /// Recovery password api.
    /// </summary>
    /// <param name="id">Coded AccountId.</param>
    /// <param name="password">New account password.</param>
    /// <response code = '200'>Successfully changed password.</response>
    /// <response code = '400'>Something went wrong.</response>
    [HttpGet("recovery-password/{id}/{password}")]
    public async Task<IActionResult> RecoveryPassword(string id, string password)
    {
        try
        {
            await _authenticateService.RecoveryPassword(id, password);
            return Ok();
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (DecodeException e)
        {
            return BadRequest(new ErrorResponseModel("Something went wrong!", e.Message));
        }
    }

    /// <summary>
    /// Forgot password.
    /// </summary>
    /// <param name="email">Account email.</param>
    /// <response code ='200'>When recover link was send to email.</response>
    [HttpGet("forgot-password/{email}")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        try
        {
            await _authenticateService.ForgotPassword(email);
            return Ok();
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    /// <summary>
    /// Registration Step by step api.
    /// </summary>
    /// <param name="registrationCompleteViewModel">Model which contain all data about user.</param>
    /// <response code ='200'>When user was created.</response>
    [Authorize]
    [HttpPost("registration-complete")]
    public async Task<IActionResult> RegistrationComplete([FromBody] RegistrationCompleteViewModel registrationCompleteViewModel)
    {
        try
        {
            if (await _authenticateService.ExistUserName(registrationCompleteViewModel.UserName))
            {
                return BadRequest(new ErrorResponseModel($"{registrationCompleteViewModel.UserName} username is already taken!"));
            }

            var responseModel = await _authenticateService.RegistrationCompleteAsync(
                _mapper.Map<RegistrationCompleteViewModel, RegistrationCompleteDto>(registrationCompleteViewModel));
            HttpContext.SetTokenCookie(responseModel);

            return Ok(new { Token = responseModel.JwtToken });
        }
        catch (AuthenticateException e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Registration complete error", e.Message));
        }
    }

    /// <summary>
    /// LogOut user.
    /// </summary>
    /// <returns></returns>
    [HttpGet("logout")]
    public IActionResult Logout()
    {
        HttpContext.DeleteRefreshToken();
        return Ok();
    }
}
