namespace StudCity.Core.DTOs;

public class FilterParameters
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 12;
    public string SearchWord { get; set; }
}
