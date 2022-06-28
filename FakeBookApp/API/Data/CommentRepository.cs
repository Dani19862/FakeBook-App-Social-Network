
using System.Collections;
using System.Reflection.Metadata;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace API.Data
{
    public class CommentRepository :ICommentRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        
        public CommentRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

        // Get all comments by postId
        public async Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId)
        {
            var comments = await _context.Comments.Where(c => c.PostId == postId).ToListAsync();
            return comments;
        }

        // Get comment by commentId
        public async Task<Comment> GetCommentByIdAsync(int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);
            return comment;
        }

        // Add new comment
        public void AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        // Delete comment
        public void DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
        }

        // Edit comment
        public void EditComment(Comment comment)
        {
            _context.Entry<Comment>(comment).State = EntityState.Modified;
        }
        
        // Check if comment exists
        public bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }


        // Get photo url by userId
        public string GetPhotoUrlAsync(int userId)
        {
            // var comment = await _context.Comments.FirstOrDefaultAsync(c => c.AppUser.UserName == username);
            // return comment.PhotoUrl;

            var photos =  _context.Photos.Where(p => p.AppUserId == userId).ToList();
            var photo = photos.Where(p => p.IsMain).FirstOrDefault();

            var defaultPhotoUrl = "https://res.cloudinary.com/hakeru/image/upload/v1656422095/blank-profile-picture-973460_1280_r8wevh.png";

            if (photo == null) return defaultPhotoUrl;

            return photo.Url.ToString();

        }
    }
}