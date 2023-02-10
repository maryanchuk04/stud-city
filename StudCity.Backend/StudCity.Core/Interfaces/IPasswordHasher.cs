namespace StudCity.Core.Interfaces;

public interface IPasswordHasher
{
    bool VerifyPassword(string password, string hashingString);

    string HashPassword(string password);
}
