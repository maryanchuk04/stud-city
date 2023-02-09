using StudCity.Core.Interfaces;

namespace StudCity.Application.Helpers;

public class PasswordHasherService : IPasswordHasher
{
    public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
    
    public bool VerifyPassword(string password, string hashingString)
    {
        return BCrypt.Net.BCrypt.Verify(password,hashingString);
    }
}