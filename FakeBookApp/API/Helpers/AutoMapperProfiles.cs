using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser,MemberDto>() //Map AppUser to MemberDto
                .ForMember(
                    dest => dest.PhotoUrl, //Map First Photo to Main Photo
                    opt =>{
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                    }
                )
                .ForMember(
                    dest => dest.Age, //Map Age to DateOfBirth
                    opt =>{
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    }
                );
                
            CreateMap<Photo,PhotoDto>(); // Map Photo Entity to PhotoDto

        }

        
    }
}