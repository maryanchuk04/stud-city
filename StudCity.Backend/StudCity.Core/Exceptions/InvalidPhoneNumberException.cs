namespace StudCity.Core.Exceptions;
public class InvalidPhoneNumberException : Exception
{
    public InvalidPhoneNumberException(string phoneNumber)
        : base($"Number {phoneNumber} is not a valid one.")
    {
    }
}
