using System.Security.Cryptography;
using System.Reflection.Metadata;
using System.Runtime.CompilerServices;
using System;
using System.Collections;
using System.Linq;
using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;

namespace API.Controllers
{
    [Authorize]
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
        [Route("create")]
        public async Task<ActionResult<CommentDto>> CreateComment(CommentDto commentDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());  // with token

            var post = await _unitOfWork.PostRepository.GetPostByIdAsync(commentDto.PostId);
            
            if (commentDto == null)  return BadRequest( "Comment is null");
            if(user == null || post == null ) return BadRequest("User or Post not found");
            

            var comment = new Comment()
            {
                Content = commentDto.Content,
                Created = DateTime.Now,
                PostId = post.Id,
                AppUserId = user.Id,
                AppUser = user,
                Post = post,
                Username = user.UserName,
                PhotoUrl = _unitOfWork.CommentRepository.GetPhotoUrlAsync(user.Id)
           
            };
            
            if (String.IsNullOrEmpty(comment.Content))  return BadRequest("You Cannot Publis Empty Comment");
            
            _unitOfWork.CommentRepository.AddComment(comment);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<CommentDto>(comment)); 

            return BadRequest("Could not add comment");


        }

        // Get One comment by commentId
        [HttpGet("{commentId}")]
        public async Task<ActionResult<CommentDto>> GetCommentById(int commentId)
        {
            var comment = await _unitOfWork.CommentRepository.GetCommentByIdAsync(commentId);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CommentDto>(comment));
        }


        // Delete comment
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


        // Edit comment
        [HttpPut]
        [Route("edit")]
        public async Task<ActionResult<CommentDto>> EditComment( CommentDto commentDto)
        {
            
            var comment = await _unitOfWork.CommentRepository.GetCommentByIdAsync(commentDto.Id);

            if (comment == null) return NotFound();

            comment.Content = commentDto.Content;

            _mapper.Map(commentDto, comment);

            _unitOfWork.CommentRepository.EditComment(comment);
            
            if (await _unitOfWork.Complete())  return NoContent();

            return BadRequest("Could not edit comment");
            
        }

    }
}