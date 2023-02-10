namespace StudCity.API.ViewModels;

public class ErrorResponseModel
{
    public string Error { get; }

    public ErrorResponseModel(string error)
    {
        Error = error;
    }
}
