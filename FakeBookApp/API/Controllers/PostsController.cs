using System.Runtime.CompilerServices;
using System;
using System.Collections;
using System.Net;
using System.Collections.Generic;
//using Microsoft.AspNetCore.Authorization;
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
    //[Authorize]
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
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(appUserid); //get user by username

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

            _unitOfWork.PostRepository.AddPostAsync(post);

            if (await _unitOfWork.Complete()) return Ok(post); //return Ok(_mapper.Map(post, postDto)); // Exception in Mapper

            return BadRequest ("Could not add post");
            
        }


        // Edit Post
        [HttpPut] 
        public async Task<ActionResult> EditPost(PostDto postDto)
        {
            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(postDto.Id);

            if (post == null) return NotFound();

            _mapper.Map(postDto, post); 
            
             _unitOfWork.PostRepository.EditPostAsync(post);
          
            if (await _unitOfWork.Complete()) return NoContent();   // here have exeptoion with saving because the postDto.Id

            return BadRequest("Could not edit post");

        }

        // Delete Post
        [HttpDelete("delete-post/{postId}")]
        public async Task<ActionResult> DeletePost(int postId)
        {
            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(postId);

            if (post == null) return NotFound();

             _unitOfWork.PostRepository.DeletePostAsync(postId);

            if (await _unitOfWork.Complete()) return Ok(post);

            return BadRequest("Could not delete post");
        }

        // Get all posts of a user
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



        // Get all posts
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
            var posts = await _unitOfWork.PostRepository.GetAllPostsAsync();
            return Ok(posts);

        }

        
    }
}