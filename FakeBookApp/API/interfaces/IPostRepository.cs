using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;


namespace API.interfaces
{
    public interface IPostRepository
    {
        void AddPostAsync(Post post);

        void DeletePostAsync(int id);

        //Task<Post> EditPostAsync(PostDto postDto);

        void EditPostAsync(Post post);

        Task<Post> GetPostByIdAsync(int id);

        //Task<PagedList<PostDto>> GetAllPostsAsync (PostParams postParams); => with pagination

        Task <IEnumerable<PostDto>> GetAllPostsAsync();

        //Task<IEnumerable<PostDto>> GetUserPostsAsync(PostDto postDto);

        //Task<PagedList<PostDto>> GetUserPostsAsync(PostParams postParams); => with pagination

        //Task<IEnumerable<PostDto>> GetUserPostsAsync(PostParams postParams);

       Task<IEnumerable<PostDto>> GetUserPostsAsync(string userName);

        //Task<PostDto> GetAllUsersPostsAsync(int id);


        //void Update (Post post);

        //Task <bool> SaveAllAsync();

        
    }
}
