using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtesions
    {
        // this mthod is used to get the paging parameters from the request and add it to the header of the response
        public static void AddPaginationHeader(this HttpResponse response,int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);

            var optonis = new JsonSerializerOptions   // to serialize the object to json
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader,optonis));
            
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");   // this is to allow the frontend to access the "Pagination" header
            
        }
        

          
    }
}