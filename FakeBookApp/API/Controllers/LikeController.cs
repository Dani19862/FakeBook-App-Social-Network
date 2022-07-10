using System.Reflection.Metadata;
using System.Text;
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
    public class LikeController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LikeController(IMapper mapper, IUnitOfWork unitOfWork) 
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            
        }

        // Add new Like => like a post
        [HttpPost]
        public async Task<ActionResult<LikeDto>> AddLike(LikeDto likeDto)
        {
            var appUserid = User.GetUserId(); //get username from token => NameId
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(appUserid);
            
            if (user == null) return BadRequest("User not found");

            var isExist = await _unitOfWork.LikeRepository.IsExist(likeDto.PostID, likeDto.LikerId);
            
            if (isExist) return BadRequest("You already liked this post"); 

            var like = new Like 
            {
                Id = 0,
                LikerId = user.Id,
                PostId = likeDto.PostID,
              
            };

            _unitOfWork.LikeRepository.AddLike(like);

            var likeCount = (await _unitOfWork.LikeRepository.GetLikesCount(likeDto.PostID)) + 1;
            
           if (await _unitOfWork.Complete()) return Ok(likeCount);

            return BadRequest("Could not add like");

        }

        // Delete Like => unlike a post
        [HttpDelete("{postId},{likerId}")]
        public async Task<ActionResult<LikeDto>> DeleteLike(int postId, int likerId)
        {
            var like = await _unitOfWork.LikeRepository.GetLikeByIdAsync(postId, likerId);

            if (like == null) return BadRequest("you already unliked this post");

            await _unitOfWork.LikeRepository.DeleteLike(postId, likerId);

            var likeToDeltet = (await _unitOfWork.LikeRepository.GetLikesCount(postId)) - 1;

           
            if (await _unitOfWork.Complete()) return Ok(likeToDeltet);

            return BadRequest("Could not delete like");
        }

        // Get Like Count for a post by postId
        [HttpGet("{postId}")]
        public async Task<ActionResult<LikeDto>> GetLikeCount(int postId)
        {
            var likeCount = await _unitOfWork.LikeRepository.GetLikesCount(postId);

            var isLiked = await _unitOfWork.LikeRepository.IsExist(postId, User.GetUserId());

            var dtoToReturn = new LikeDto
            {
                LikeCount = likeCount,
                IsLiked = isLiked
            };

            return Ok( dtoToReturn);
    
        }

        

        

    }
    
}