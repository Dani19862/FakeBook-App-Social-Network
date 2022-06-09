using System;
using API.Entities;

namespace API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int PostId { get; set; }
        public string UserName { get; set; }
        public int AppUserId { get; set; }
        public string PhotoUrl { get; set; } 

    }
}