using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        // This method is used to get the username from the token
        public static string GetUsername(this ClaimsPrincipal user)  
        {
            return user.FindFirst(ClaimTypes.Name)?.Value; 
        }
        // This method is used to get the user's id from the token
        public static int GetUserId(this ClaimsPrincipal user)  
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value); 
        }

       
    }
}