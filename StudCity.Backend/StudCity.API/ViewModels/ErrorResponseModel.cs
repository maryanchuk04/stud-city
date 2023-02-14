namespace StudCity.API.ViewModels;

/// <summary>
/// Model for show errors in response.
/// </summary>
public class ErrorResponseModel
{
    /// <summary>
    /// Error message.
    /// </summary>
    public string Error { get; }

    /// <summary>
    /// Simple constructor.
    /// </summary>
    /// <param name="error">error message.</param>
    public ErrorResponseModel(string error)
    {
        Error = error;
    }
}
