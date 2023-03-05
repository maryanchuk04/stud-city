using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.Policies;
using StudCity.API.ViewModels;
using StudCity.Core.DTOs;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

[ApiController]
[Authorize(Policy = PolicyNames.AdminPolicyName)]
[Route("/teachers-store")]
public class TeachersStoreController : ControllerBase
{
    private readonly ITeachersStoreService _teachersStoreService;

    public TeachersStoreController(ITeachersStoreService teachersStoreService)
    {
        _teachersStoreService = teachersStoreService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTeacherStore()
    {
        try
        {
            return Ok(await _teachersStoreService.GetTeachersStoreAsync());
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Get teacher error", e.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateNewTeacher([FromBody] EmailViewModel emailViewModel)
    {
        try
        {
            await _teachersStoreService.InsertAsync(new TeachersStoreDto { Email = emailViewModel.Email });
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel("Insert new teacher error", e.Message));
        }
    }
}
