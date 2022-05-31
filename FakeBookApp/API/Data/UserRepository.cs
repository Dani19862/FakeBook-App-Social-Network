using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            
        }

        // Get all users accept from currentUser from the database and map them to MemberDto
        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            
            //var query = _context.Users.AsQueryable();  
            // filter => all users except current user
            //query = query.Where(u => u.UserName != userParams.CurrentUsername);
            
            // filter => users with age between min and max
           // var minDob = DateTime.Today.AddYears(-userParams.MaxAge -1);
            //var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
            
            //query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);

            // query = userParams.OrderBy switch
            // {
            //     "created" => query.OrderByDescending(u => u.Created),
            //     _ => query.OrderByDescending(u => u.LastActive)
            // };
            

            // return await PagedList<MemberDto>.CreateAsync
            // (
            //     query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider),    
            //     userParams.PageNumber, 
            //     userParams.PageSize
            // );

            //////////////////

            var query = _context.Users.AsQueryable();  
            //filter => all users except current user
            query = query.Where(u => u.UserName != userParams.CurrentUsername);

            return await PagedList<MemberDto>.CreateAsync
            (
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize
            );
        }

        // Get the user by username after mapping it to MemberDto
        public async Task<MemberDto> GetMemberAsync(string userName)
        {
            return await _context.Users
            .Where(u => u.UserName == userName)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        // Get the user by UserName
        public async Task<AppUser> GetUserByUserNameAsync(string username)
        {
           return await _context.Users
           .Include (u => u.Photos)
           .SingleOrDefaultAsync(u => u.UserName == username);
        }

        //find user by id
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        //save changes to database and return true if changes were made or false if not more than 1 change was made    
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;

        }

        //update user
        public void Update(AppUser user)
        {
            _context.Entry<AppUser>(user).State = EntityState.Modified; //update user in database 
        }

        //Search filter accept him self

        // public async Task<PagedList<MemberDto>> Search(string search, UserParams userParams)
        // {
        //     var query = _context.Users.AsQueryable();
        //     if (!string.IsNullOrEmpty(userParams.Search) && userParams.CurrentUsername != query.)
        //     {
        //         query = query.Where(u => u.UserName.ToLower().Contains(userParams.Search.ToLower()) ||
        //                                  u.KnownAs.ToLower().Contains(userParams.Search.ToLower()));
        //     }
           
        //     return await PagedList<MemberDto>.CreateAsync
        //     (
        //         query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
        //         userParams.PageNumber,
        //         userParams.PageSize
        //     );
        // }

    }
}