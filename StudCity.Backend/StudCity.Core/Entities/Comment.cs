namespace StudCity.Core.Entities;

public class Comment : BaseEntity
{
    public string Message { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; }

    public DateTime Date { get; set; }

    public ICollection<Comment> ReplyComments { get; set; }

    public ICollection<Like> Likes { get; set; }
}
