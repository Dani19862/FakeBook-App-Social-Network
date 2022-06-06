
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities
{
    [Table("Posts")]
    public class Post
    {
        
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Content { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set;}

        

        
        //public ICollection<Like> Likes { get; set; }
        
        //public ICollection<Comment> Comments { get; set; }

        //public string PhotoUrl { get; set; }

    }
}