using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _config = config;
        }

        // Get all users from the database and map them to MemberDto
        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
           return await _context.Users
           .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        // Get the user by username after mapping it to MemberDto
        public async Task<MemberDto> GetMemberAsync(string userName)
        {
            return await _context.Users
            .Where(u => u.UserName == userName)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
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


    }
}