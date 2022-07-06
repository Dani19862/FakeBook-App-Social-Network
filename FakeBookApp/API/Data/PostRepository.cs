using System.Collections;
using System.Reflection.Metadata;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using System.Collections.Generic;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        

        public PostRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // To Add new Post
     
        public void AddPost(Post post)
        {
            _context.Posts.Add(post);
        }

        // To Delete Post

        public void DeletePost(int id)
        {
            var delete = _context.Posts.Where(p => p.Id == id).FirstOrDefault();
            _context.Posts.Remove(delete);
        }

        //Edit Post

        //public async Task<Post> EditPostAsync(PostDto postDto)
        public void EditPost(Post post)
        {
            _context.Entry<Post>(post).State = EntityState.Modified; 

        }
      
        //Get Post by Id
        public async Task<Post> GetPostByIdAsync(int id)
        {
            var post = _context.Posts.Where(p => p.Id == id).FirstOrDefaultAsync();

            return await post;

        }

        //Get All Posts  => with pagination

        // public async Task<PagedList<PostDto>> GetAllPostsAsync (PostParams postParams)
        // {
            
        //     var posts = _context.Posts
        //         .Select(p => p)
        //         .OrderByDescending(p => p.Created)
        //         .AsQueryable();

        //    //if (postParams.CurrentUsername == null)  return new PagedList<PostDto>(new List<PostDto>{}, 0, 0, 0);

        //     var postToRetuen = posts.Select(p => new PostDto
        //     {
        //         Id = p.Id,
        //         Content = p.Content,
        //         Created = p.Created,
        //         AppUserId = p.AppUserId,
               
        //     });

        //     return await PagedList<PostDto>.CreateAsync(postToRetuen, postParams.PageNumber, postParams.PageSize);
            
        // }

        // public async Task <List<PostDto>> GetAllPostsAsync()
        // {
        //     var posts =  _context.Posts
        //     .Select(p => p)
        //     .Include (c => c.Comments)
        //     .OrderByDescending(p => p.Created)
        //     .ProjectTo<PostDto>(_mapper.ConfigurationProvider).ToListAsync();

        //     // var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Comment, CommentDto>()).CreateMapper();
        //     // var a = posts;

        //     return await posts;

        // }

        
        public async Task <List<PostDto>> GetAllPostsAsync(PostParams postParams)
        {
            if (!String.IsNullOrEmpty(postParams.Search))
            {
                var posts =  _context.Posts
                   .Where(p => p.Content.Contains(postParams.Search.ToLower()) || (p.Comments.Any(t => t.Content.Contains(postParams.Search.ToLower())))).OrderByDescending(p => p.Created)
                   .Include (c => c.Comments)
                   .OrderByDescending(p => p.Created)
                   .ProjectTo<PostDto>(_mapper.ConfigurationProvider).ToListAsync();

                   return await posts;
            }
            
            
            return await _context.Posts
                    .Select(p => p)
                    .Include (c => c.Comments)
                    .OrderByDescending(p => p.Created)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider).ToListAsync();
        
        }

        
        //Get All Posts of User by username
        public async Task<IEnumerable<PostDto>> GetUserPostsAsync(string userName)
        {

            var posts = _context.Posts.Where(p => p.AppUser.UserName == userName).AsQueryable();

            // if (postParams.CurrentUsername == null) return new PagedList<PostDto>(new List<PostDto>{}, 0, 0, 0); => with pagination

            var result = posts.Select
            (
                p => new PostDto
                {
                    Id = p.Id,
                    Content = p.Content,
                    Created = p.Created,
                    AppUserId = p.AppUserId,
                    Username = p.AppUser.UserName,
                    PhotoUrl = p.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url

                }
            );

            //return await PagedList<PostDto>.CreateAsync(result, postParams.PageNumber, postParams.PageSize); 
            
            return await Task.FromResult(result);

        }
        
        // Update Post in Database
        public void Update(Post post)
        {   
            _context.Entry<Post>(post).State = EntityState.Modified;

        }

    }
}