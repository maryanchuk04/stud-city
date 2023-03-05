using StudCity.Core.Enums;

namespace StudCity.Core.DTOs;

public class SettingsDto
{
    public Theme Theme { get; set; }

    public InterfaceLanguage Language { get; set; }

    public string BackgroundImage { get; set; }
}
