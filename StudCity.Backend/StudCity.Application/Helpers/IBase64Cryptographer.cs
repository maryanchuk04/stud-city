using System.Text;
using StudCity.Core.Interfaces;

namespace StudCity.Application.Helpers;

public class Base64Cryptographer : ICryptographer
{
    public string Encode(string word)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(word));
    }

    public string Decode(string codedWord)
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(codedWord));
    }
}
