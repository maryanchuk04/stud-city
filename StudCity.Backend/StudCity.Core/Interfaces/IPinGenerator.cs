namespace StudCity.Core.Interfaces;

public interface IPinGenerator
{
    public int Min { get; protected set; }

    public int Max { get; protected set; }

    public int Generate();
}
