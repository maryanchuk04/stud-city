namespace StudCity.Core.Entities;

public class PublicationImage : BaseEntity
{
    public Guid ImageId { get; set; }
    public Image Image { get; set; }

    public Guid PublicationId { get; set; }
    public Publication Publication { get; set; }
}
