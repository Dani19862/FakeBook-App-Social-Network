using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;


namespace API.interfaces
{
    public interface IPostRepository
    {
        void AddPost(Post post);

        void DeletePost(int id);


        void EditPost(Post post);

        Task<Post> GetPostByIdAsync(int id);

        Task <List<PostDto>> GetAllPostsAsync(PostParams postParams); // new

       Task<IEnumerable<PostDto>> GetUserPostsAsync(string userName);

        
    }
}
