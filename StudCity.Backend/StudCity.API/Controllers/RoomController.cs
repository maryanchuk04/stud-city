using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudCity.API.ViewModels;
using StudCity.Core.Interfaces;

namespace StudCity.API.Controllers;

[ApiController]
[Route("/room")]
[Authorize]
public class RoomController : ControllerBase
{
    private readonly IRoomService _roomService;

    public RoomController(IRoomService roomService)
    {
        _roomService = roomService;
    }

    [HttpGet]
    public async Task<IActionResult> GetChats()
    {
        try
        {
            return Ok(await _roomService.GetUsersRooms());
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateChat([FromBody] CreateChatViewModel viewModel)
    {
        try
        {
            return Ok(await _roomService.CreateRoom(viewModel.UsersIds, viewModel.Title));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("{chatId}/{userId}")]
    public async Task<IActionResult> GetChat(Guid chatId, Guid userId)
    {
        try
        {
            return Ok(await _roomService.GetRoom(chatId, userId));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChatById(Guid id)
    {
        try
        {
            return Ok(await _roomService.GetRoomById(id));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}
