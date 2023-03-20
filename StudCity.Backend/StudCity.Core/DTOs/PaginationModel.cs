namespace StudCity.Core.DTOs;

public class PaginationModel<T>
{
    public int Count { get; set; }
    public T[] Items { get; set; }
}
