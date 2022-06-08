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

        public async Task<IEnumerable<Comment>> GetCommentsByPostIdAsync(int postId)
        {
            var comments = await _context.Comments.Where(c => c.PostId == postId).ToListAsync();
            return comments;
        }

        public async Task<Comment> GetCommentByIdAsync(int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);
            return comment;
        }

        public void AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        public void DeleteComment(Comment comment)
        {
            _context.Comments.Remove(comment);
        }

        public void UpdateComment(Comment comment)
        {
            _context.Entry<Comment>(comment).State = EntityState.Modified;
        }
        
        public bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
        
    }
}