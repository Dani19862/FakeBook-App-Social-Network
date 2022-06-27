using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;

namespace API.interfaces
{
    public interface ILikeRepository
    {


        //Task<IEnumerable<Like>> GetCommentLikes(int commentId);

        void AddLike(Like like);

        Task<int> DeleteLike(int postId, int likerId);

        Task<int> GetLikesCount(int postId);

        Task<Like> GetLikeByIdAsync(int postId, int likerId);

        Task<bool> IsExist(int postId, int likerId);

    }
}
