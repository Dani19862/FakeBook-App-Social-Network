namespace API.Entities
{
    public class Like
    {
        public int Id { get; set; }

        public int LikerId { get; set; }

        public int PostId { get; set; } 

        public virtual Post Post { get; set; }
    }
}