
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int PostId { get; set; }
        public int AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual Post Post { get; set; }



    }   
}