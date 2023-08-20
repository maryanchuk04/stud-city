using StudCity.Core.Entities;

namespace StudCity.Core.DTOs;

public class PublicDto
{
    public PublicDto(
        Guid id,
        string name,
        string image,
        UserDto owner,
        IEnumerable<UserDto> users,
        IEnumerable<UserDto> admins,
        bool isPrivate)
    {
        Id = id;
        Name = name;
        Image = image;
        Owner = owner;
        Users = users;
        Admins = admins;
        IsPrivate = isPrivate;
    }

    public PublicDto() {}

    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Image { get; set; }

    public UserDto Owner { get; set; }

    public IEnumerable<UserDto> Users { get; set; }

    public IEnumerable<UserDto> Admins { get; set; }

    public bool IsPrivate { get; set; }
}
