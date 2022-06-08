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
//using Microsoft.AspNetCore.Authorization;
using API.Extensions;

namespace API.Controllers
{
    //[Authorize]
    public class CommentController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CommentController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            
        }

        // Get all comments of post
        [HttpGet("{postId}")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByPostId(int postId)
        {
            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(postId);
            
            if (post == null)
            {
                return NotFound();
            }

            var comments = await _unitOfWork.CommentRepository.GetCommentsByPostIdAsync(post.Id);

            return Ok(_mapper.Map<IEnumerable<CommentDto>>(comments));

        }

        // Create new comment
        [HttpPost]
        public async Task<ActionResult<CommentDto>> AddComment(CommentDto commentDto)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());  // with token

            // var userId = User.GetUserId();

            // var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(commentDto.UserName);

            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(commentDto.PostId);
            
            if (commentDto == null)  return BadRequest( "Comment is null");
            if(user == null || post == null ) return BadRequest("User or Post not found");

            if (_unitOfWork.CommentRepository.CommentExists(commentDto.PostId)) return BadRequest("Comment already exists");
          
            var comment = new Comment
            {
                Content = commentDto.Content,
                Created = DateTime.Now,
                PostId = post.Id,
                AppUserId = user.Id,
                AppUser = user

            };

            _unitOfWork.CommentRepository.AddComment(comment);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<CommentDto>(comment)); //return Ok(_mapper.Map(comment, commentDto)); // Exception in Mapper

            return BadRequest("Could not add comment");


        }

        [HttpDelete("{commentId}")]
        public async Task<ActionResult> DeleteComment(int commentId)
        {
            var comment = await _unitOfWork.CommentRepository.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }
            _unitOfWork.CommentRepository.DeleteComment(comment);
            await _unitOfWork.Complete();
            return NoContent();
        }

        // Get One comment by commentId
        [HttpGet]
        public async Task<ActionResult<CommentDto>> GetCommentById(int commentId)
        {
            var comment = await _unitOfWork.CommentRepository.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CommentDto>(comment));
        }



        [HttpPut("{commentId}")]
        public async Task<ActionResult<CommentDto>> UpdateComment(int commentId, CommentDto commentDto)
        {
            var comment = await _unitOfWork.CommentRepository.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }
            _mapper.Map(commentDto, comment);
            await _unitOfWork.Complete();
            return Ok(_mapper.Map<CommentDto>(comment));
        }

      


    }
}