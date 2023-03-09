using System.ComponentModel.DataAnnotations.Schema;
using StudCity.Core.Enums;

namespace StudCity.Core.Entities;

[Table("Settings")]
public class Settings : BaseEntity
{
    public InterfaceLanguage Language { get; set; }

    public Theme Theme { get; set; }

    public Image BackgroundImage { get; set; }

    public User User { get; set; }

    public Guid UserId { get; set; }
}
