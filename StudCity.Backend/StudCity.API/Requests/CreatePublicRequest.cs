namespace StudCity.API.Requests;

public class CreatePublicRequest
{
    public CreatePublicRequest(
        IEnumerable<Guid> usersIds,
        string name,
        string description,
        string image,
        bool isPrivate,
        string codeWord)
    {
        UsersIds = usersIds;
        Name = name;
        Description = description;
        Image = image;
        IsPrivate = isPrivate;
        CodeWord = codeWord;
    }

    public IEnumerable<Guid> UsersIds { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Image { get; set; }

    public bool IsPrivate { get; set; }

    public string CodeWord { get; set; }
}
