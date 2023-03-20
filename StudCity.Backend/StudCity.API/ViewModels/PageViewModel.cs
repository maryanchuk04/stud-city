using System.Diagnostics.CodeAnalysis;

namespace StudCity.API.ViewModels;

public class PageViewModel
{
    public PageViewModel(int count, int pageNumber, int pageSize)
    {
        TotalItemsCount = count;
        PageNumber = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        if (TotalPages != 0 && PageNumber > TotalPages)
            throw new ArgumentOutOfRangeException(nameof(pageNumber),"Page number couldn't be greater then total pages");
    }

    public int PageNumber { get; }

    public int TotalPages { get; }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public int TotalItemsCount { get; set; }
}
