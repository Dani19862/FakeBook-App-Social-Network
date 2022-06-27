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
    public class LikeRepository :ILikeRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public LikeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Add new Like
        public void AddLike(Like like)
        {
            _context.Likes.Add(like);

        }

        // Delete Like 
        public async Task<int> DeleteLike(int postId, int likerId)
        {
            var post = await _context.Likes.Where(l => l.PostId == postId && l.LikerId == likerId).FirstOrDefaultAsync();

            var unLike = GetLikesCount(postId);

            int count = unLike.Result;
           
            _context.Likes.Remove(post);
           
            return count;

        }

        // get like count for a post => return the number of likes for a post
        public async Task<int> GetLikesCount(int postId)
        {
            var like = await _context.Likes.Where(l => l.PostId == postId).ToListAsync();
            if (like == null) return 0;
            int count = like.Count();
            return count;
        }

        public async Task<Like> GetLikeByIdAsync(int postId, int likerId)
        {
            var like = await _context.Likes.Where(l => l.PostId == postId && l.LikerId == likerId).FirstOrDefaultAsync();
            return like;
        }

        public async Task<bool> IsExist(int postId, int likerId)
        {
            var like = await _context.Likes.Where(l => l.PostId == postId && l.LikerId == likerId).FirstOrDefaultAsync();
            return like != null;
        }

       
    }
}
