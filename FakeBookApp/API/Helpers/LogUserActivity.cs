using System;
using System.Threading.Tasks;
using API.Extensions;
using API.interfaces;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            var resultContext =await next();
            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;   // if user is not authenticated, return

            var userId = resultContext.HttpContext.User.GetUserId();

            var uow = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();  // get the user repository from the request services

            var user = await uow.UserRepository.GetUserByIdAsync(userId);


            user.LastActive = DateTime.Now;

            await uow.Complete();


        }
    }
}