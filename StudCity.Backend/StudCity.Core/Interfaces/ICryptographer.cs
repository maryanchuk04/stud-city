namespace StudCity.Core.Interfaces;

public interface ICryptographer
{
    string Encode(string word);
    string Decode(string codedWord);
}
