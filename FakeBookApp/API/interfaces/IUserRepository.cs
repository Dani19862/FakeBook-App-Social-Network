using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<AppUser> GetUserByIdAsync (int id);
        
        Task<IEnumerable<MemberDto>> GetMembersAsync(); //get all Members

        Task<MemberDto> GetMemberAsync(string userName); //get member by username
            
                 
    }
}