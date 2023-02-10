using StudCity.Core.Interfaces;

namespace StudCity.Application.Helpers;

public class PinGenerator : IPinGenerator
{
    int IPinGenerator.Min { get; set; } = 0;

    int IPinGenerator.Max { get; set; } = 999999;

    private readonly Random _random = new ();

    public int Generate()
    {
        return _random.Next(((IPinGenerator)this).Min, ((IPinGenerator)this).Max);
    }
}
