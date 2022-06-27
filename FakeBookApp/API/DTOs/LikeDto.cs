using System;

namespace API.DTOs
{
    public class LikeDto
    {

        public int Id { get; set; }

        public int LikerId { get; set; }

        public string Username { get; set; }

        public int PostID { get; set; }

        public DateTime Created { get; set; }

        public Boolean IsLiked { get; set; }

        public int LikeCount { get; set; }

        
    }
}
