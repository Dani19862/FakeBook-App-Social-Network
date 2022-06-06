using System;
using API.Entities;
namespace API.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int AppUserId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        
        //public AppUser AppUser { get; set; }
        

    }
}