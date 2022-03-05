using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using API.Errors;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;

 
        public ExceptionMiddleware(
            RequestDelegate next,
            IHostEnvironment env, 
            ILogger<ExceptionMiddleware> logger
        )
        {
            _next = next;
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync (HttpContext Context)
        {
            try
            {
                await _next(Context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                
                Context.Request.ContentType = "application/json";
                Context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new ApiExeption(Context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiExeption(Context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await Context.Response.WriteAsync(json);

            }
 
        }
    }
}  