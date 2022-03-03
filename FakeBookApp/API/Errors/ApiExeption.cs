using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiExeption
    {
        public int StatusCode { get; }
        public string Message { get; }
        public string Details { get; }
        public ApiExeption(int statusCode, string message = null, string details = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
        
        

    }
}