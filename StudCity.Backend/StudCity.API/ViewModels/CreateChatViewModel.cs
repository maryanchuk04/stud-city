namespace StudCity.API.ViewModels;

public class CreateChatViewModel
{
    public IEnumerable<Guid> UsersIds { get; set; }

    public string Title { get; set; }

    public string ImageUrl { get; set; }
}
