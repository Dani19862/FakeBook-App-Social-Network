using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Entities;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        // 401 Unauthorized
        [Authorize]       // with return 
        [HttpGet("auth")] //buggy/auth
        public ActionResult<string> GetSecret()
        {
            return "secret string";
        }

        // 404 Not Found
        [HttpGet("not-found")] //buggy/not-found
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // 500 Internal Server Error
        [HttpGet("server-error")]  //api/buggy/server-error
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingToString = thing.ToString(); //NullReferenceException
            return thingToString;
        }

        // BadRequest
        [HttpGet("bad-request")] //api/buggy/bad-request
        public ActionResult<string> GetBadRequest()
        {
           return BadRequest("this is a bad request" );
        }


    }
}