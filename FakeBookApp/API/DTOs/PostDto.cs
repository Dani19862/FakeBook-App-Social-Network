using System.Collections;
using System;
using API.Entities;
using System.Collections.Generic;


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

        public virtual ICollection<Comment> Comments { get; set; }
        
        //public AppUser AppUser { get; set; }

        
        public ICollection<Like> Likes { get; set; }
        

    }
}