using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;

namespace API.interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId);

        Task<Comment> GetCommentByIdAsync(int commentId);

        void AddComment(Comment comment);

        void DeleteComment(Comment comment);

        void UpdateComment(Comment comment);

        bool CommentExists(int id);

        string GetPhotoUrlAsync(int userId);
        


    }
}