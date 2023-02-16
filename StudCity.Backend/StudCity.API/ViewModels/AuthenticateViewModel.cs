using System.ComponentModel.DataAnnotations;

namespace StudCity.API.ViewModels;

/// <summary>
/// Authenticate view models.
/// </summary>
public class AuthenticateViewModel
{
    /// <summary>
    /// Email field.
    /// </summary>
    [Required]
    public string Email { get; set; }

    /// <summary>
    /// Password field.
    /// </summary>
    [Required]
    public string Password { get; set; }
}
