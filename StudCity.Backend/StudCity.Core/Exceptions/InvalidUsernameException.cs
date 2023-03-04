namespace StudCity.Core.Exceptions;
public class InvalidUsernameException : Exception
{
    public InvalidUsernameException(string userName)
        : base($"Username : {userName} is not valid.")
    {
    }
}
