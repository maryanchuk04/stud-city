using StudCity.Core.Enums;

namespace StudCity.Core.Entities;

public class Settings : BaseEntity
{
    public InterfaceLanguage Language { get; set; }
    public Theme Theme { get; set; }
    public User? User { get; set; }
    public Guid UserId { get; set; }
}