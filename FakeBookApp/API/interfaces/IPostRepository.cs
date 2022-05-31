using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;


namespace API.interfaces
{
    public interface IPostRepository
    {
        void AddPostAsync(Post post);

        void DeletePostAsync(int id);

        Task<Post> EditPostAsync(PostDto postDto);

        Task<Post> GetPostByIdAsync(int id);

        Task<PagedList<PostDto>> GetAllPostsAsync (PostParams postParams);
       
        Task<PagedList<PostDto>> GetUserPostsAsync(PostParams postParams);

        //Task<PostDto> GetAllUsersPostsAsync(int id);


        void Update (Post post);

        //Task <bool> SaveAllAsync();

        
    }
}
