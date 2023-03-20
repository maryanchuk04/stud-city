using StudCity.Core.DTOs;

namespace StudCity.API.ViewModels;

public class IndexViewModel<T>
{
    public PageViewModel PageViewModel { get; set; }
    public T[] Items { get; set; }
}
