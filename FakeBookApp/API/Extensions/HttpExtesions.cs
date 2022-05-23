using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtesions
    {
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