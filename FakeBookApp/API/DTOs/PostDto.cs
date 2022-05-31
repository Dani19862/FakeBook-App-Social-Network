using System;
namespace API.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int AppUserId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        //public AppUser AppUser { get; set; } = AppUser.Id;
        

        //public string PhotoUrl { get; set; }
    }
}