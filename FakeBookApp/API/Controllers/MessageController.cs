using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    [Authorize]
    public class MessageController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MessageController(IMapper mapper, IUnitOfWork unitOfWork )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> AddMessage(CreateMessageDto createMessageDto)
        {
            
            var username = User.GetUsername(); //get username from token => NameId


            if (username == createMessageDto.RecipientName.ToLower())
            {
                return BadRequest("You can't send message to yourself");
            }
            
            var sender = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);

            var recipient = await _unitOfWork.UserRepository.GetUserByUserNameAsync(createMessageDto.RecipientName);

            if (recipient == null)
            {
                return NotFound("User not found");
            }
            
            var message = new Message 
            {
                Sender = sender,
                SenderName = sender.UserName,
                Recipient = recipient,
                RecipientName = recipient.UserName,
                Content = createMessageDto.Content
            };
            
            _unitOfWork.MessageRepository.AddMessage(message);
            
            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<MessageDto>(message));
            
            return BadRequest("Failed to send message");
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {

            messageParams.UserName = User.GetUsername();
            
            var messages = await _unitOfWork.MessageRepository.GetMessagesForUser(messageParams);
            
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            
            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();
            var messageThread = await  _unitOfWork.MessageRepository.GetMessageThread(currentUsername, username);

            return Ok(messageThread);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();
            
            var message = await _unitOfWork.MessageRepository.GetMessage(id);
            
            if (message == null)
            {
                return NotFound("Message not found");
            }
            
            if (message.Sender.UserName != username && message.Recipient.UserName != username)  return Unauthorized("You are not authorized to delete this message");

            message.RecipientDeleted = true;
            
            if(message.SenderDeleted && message.RecipientDeleted)
            {
                _unitOfWork.MessageRepository.DeleteMessage(message);
            }
            
            _unitOfWork.MessageRepository.DeleteMessage(message);
            
            if (await _unitOfWork.Complete()) return Ok();
            
            return BadRequest("Failed to delete message");
        }

    }
}