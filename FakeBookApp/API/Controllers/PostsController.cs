using System.Runtime.CompilerServices;
using System;
using System.Collections;
using System.Net;
using System.Collections.Generic;

using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using API.Extensions;

namespace API.Controllers
{
    public class PostController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PostController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        // Add new Post
        [HttpPost]
        public async Task<ActionResult<PostDto>> AddPost(PostDto postDto)
        {

            var appUserid = User.GetUserId(); //get username from token => NameId
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(appUserid); 

            //_mapper.Map(memberUpdateDto, user); //map MemberUpdateDto to AppUser

            var post = new Post 
            {
                //Id= postDto.Id,    
                Created = DateTime.Now,
                Content = postDto.Content,
                AppUserId = appUserid,
                //Username = user.UserName,
                //PhotoUrl =  postDto.PhotoUrl
                AppUser = user

            };

            _unitOfWork.PostRepository.AddPost(post);

            if (await _unitOfWork.Complete()) return Ok(post); 

            return BadRequest ("Could not add post");
            
        }


        // Edit Post
        [HttpPut] 
        public async Task<ActionResult> EditPost(PostDto postDto)
        {
            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(postDto.Id);

            if (post == null) return NotFound();

            _mapper.Map(postDto, post); 
            
             _unitOfWork.PostRepository.EditPost(post);
          
            if (await _unitOfWork.Complete()) return NoContent();  

            return BadRequest("Could not edit post");

        }

        // Delete Post
        [HttpDelete("delete-post/{postId}")]
        public async Task<ActionResult> DeletePost(int postId)
        {
            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(postId);

            if (post == null) return NotFound();

             _unitOfWork.PostRepository.DeletePost(postId);

            if (await _unitOfWork.Complete()) return Ok(post);

            return BadRequest("Could not delete post");
        }

        // Get all posts of a user with pagination
        // ToDo: make posts with pagination
        // [HttpGet("{id}")]
        // public async Task<ActionResult<PostDto>> GetUserPostsAsync([FromQuery] PostParams postParams)
        // {
        //     var post = await _unitOfWork.PostRepository.GetUserPostsAsync(postParams);

        //     Response.AddPaginationHeader(post.CurrentPage, post.PageSize, post.TotalCount, post.TotalPages);

        //     return Ok(post);
            
        // }   

        // Get all posts of a user without pagination
        [HttpGet("{username}", Name = "GetUserPostsAsync")]
        public async Task<ActionResult<PostDto>> GetUserPostsAsync(string username)
        {
            var posts = await _unitOfWork.PostRepository.GetUserPostsAsync(username);
            return Ok(posts);
        }   

        // Get all posts with pagination
        // ToDo: make posts with pagination
        // [HttpGet]
        // public async Task <ActionResult<PostDto>> GetAllPostsAsync([FromQuery] PostParams postParams)  
        // {
        //     var post = await _unitOfWork.PostRepository.GetAllPostsAsync(postParams);

        //     Response.AddPaginationHeader(post.CurrentPage, post.PageSize, post.TotalCount, post.TotalPages);

        //     return Ok(post);
        // } 

        
        // Get all posts
        [HttpGet]
        public async Task <ActionResult<IEnumerable<PostDto>>> GetAllPostsAsync()  
        {
            //var photo =  _unitOfWork.CommentRepository.GetPhotoUrlAsync(1);
            var posts = await _unitOfWork.PostRepository.GetAllPostsAsync();
            return Ok(posts);

        }

    }
}
