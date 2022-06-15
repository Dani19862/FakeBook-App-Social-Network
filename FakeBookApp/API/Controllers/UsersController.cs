using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;

        public UsersController( IUnitOfWork unitOfWork,IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;

        }

        [HttpPut] //update user by username after mapping it to MemberUpdateDto

        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.GetUsername(); //get username from token => NameId
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username); //get user by username

            _mapper.Map(memberUpdateDto, user); //map MemberUpdateDto to AppUser

            _unitOfWork.UserRepository.Update(user); //update the user

            if (await _unitOfWork.Complete())
            {
                return NoContent();
            }

            return BadRequest($"Updating user {username} failed on save");

        }


        [HttpGet]  //get all users from the database and map them to MemberDto
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(User.GetUsername());

            userParams.CurrentUsername = user.UserName;

            var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);

        }

        [HttpGet("{username}", Name ="GetUser")] //get user by username after mapping it to MemberDto
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var userToReturn = await _unitOfWork.UserRepository.GetMemberAsync(username);
            return Ok(userToReturn);
        }

        [HttpPost("{add-photo}")] //add photo to user 
        public async Task<ActionResult<PhotoDto>> AddPhotoAsync(IFormFile file)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);
            
            var result = await _photoService.UploadPhotoAsync(file); //upload photo to cloudinary

           if(result.Error != null)  //if upload failed
            {
              return BadRequest("Could not add photo" +" "+ result.Error.Message); //return error message
            }

            var photo = new Photo{   //create new photo
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if(user.Photos.Count == 0) //if user has no photos
            {
                photo.IsMain = true; //set photo to main
            }

            user.Photos.Add(photo); //add photo to user

            if (await _unitOfWork.Complete()) //save user to database and return photo url if successful
            {
                var photoToReturn = _mapper.Map<PhotoDto>(photo); //map photo to PhotoDto
                return CreatedAtRoute("GetUser", new {username = user.UserName}, photoToReturn);  
            }

            return BadRequest("Could not add photo"  +" "+ result.Error.Message); //return error message if unsuccessful 
        }


        [HttpPut("set-main-photo/{photoId}")] //set photo to main 
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);

            var photo = user.Photos.FirstOrDefault(p=> p.Id == photoId); //get photo by id

            if(photo == null) //if photo does not exist
            {
                return BadRequest("Photo does not exist"); //return error message
            }
            
            if(photo.IsMain) //if photo is already main
            {
                return BadRequest("This is already the main photo");
            }

            var currentMainPhoto = user.Photos.FirstOrDefault(p=> p.IsMain); //get current main photo

            if(currentMainPhoto != null) //if there is a current main photo
            {
                currentMainPhoto.IsMain = false; //set current main photo to false
            }

            photo.IsMain = true; //set photo to main

            if(await _unitOfWork.Complete()) //save user to database and return photo url if successful
            {
                return NoContent();     //return status code 204 No Content
            }

            return BadRequest("Could not set photo to main"); //return error message if unsuccessful

        }


        // delete photo from user 
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var username = User.GetUsername();     //get username from token
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);  //get user by username

            var photo = user.Photos.FirstOrDefault(p=> p.Id == photoId); //get photo by photo id

            if(photo==null) //if photo does not exist
            {
                return BadRequest("Photo does not exist");
            }

            if(photo.IsMain) //if photo is main photo => cant delete main photo
            {
                return BadRequest("You cannot delete your main photo");
            }

            if(photo.PublicId != null) //if photo has public id => delete photo from cloudinary
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);  //delete photo from cloudinary

                if(result.Error != null) //if delete failed
                {
                    return BadRequest("Could not delete photo" + " " + result.Error.Message); //return error message
                }

            }

            user.Photos.Remove(photo); //remove photo from user

            if(await _unitOfWork.Complete()) //save user to database and return photo url if successful
            {
                return Ok();     
            }
            return BadRequest("Could not delete photo"); //return error message if unsuccessful
        }

        
    
    }
}
