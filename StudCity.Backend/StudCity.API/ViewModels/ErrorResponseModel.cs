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

    public string Details { get; }

    /// <summary>
    /// Simple constructor.
    /// </summary>
    /// <param name="error">error message.</param>
    public ErrorResponseModel(string error)
    {
        Error = error;
        Details = error;
    }

    /// <summary>
    /// Constructor with details.
    /// </summary>
    /// <param name="error">error message.</param>
    /// <param name="details">details of error message.</param>
    public ErrorResponseModel(string error, string details)
    {
        Error = error;
        Details = details;
    }
}
