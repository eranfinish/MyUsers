using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json;
using System.Linq;
using TestApi.DAL;
using TestApi.Models;

using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestApi.Controllers 
{ 
   
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IWebHostEnvironment Environment;
        public TestController(
           // IHttpClientFactory clientFactory,
            IWebHostEnvironment environment)
        {
            //       _logger = logger;
            Environment = environment;
            Path = Environment.ContentRootPath;
        }

        // private readonly IMemoryCache _cache =new MemoryCache();
        public static List<User> Users { get; set; }
        public static string Path
        {
            get;
            set;
        }
        //public TestController(IMemoryCache cache)
        //{
        //    _cache = cache;            //   var user = DB_Access.Instance;

        //}


        // GET: api/<TestController>/5/6
      //  [HttpGet("GetPath")]

        //public string GetPath()
        //{
        //    var path = Path.Combine(Environment.ContentRootPath, @"wwwroot\DATA\MOCK_DATA.json");
        //    return path;

        //}


        // GET: api/<TestController>/5/6
        [HttpGet("Get/{x}/{y}")]

        public UsersList Get(int x, int y)
        {
            try
            {
                if (x < 0)
                {
                    x = 0;
                }
              
                var usersList = new UsersList();
                var allUsers = new List<User>();
                allUsers = CacheModel.Get("AllUsers");

                if (allUsers != null && allUsers.Count > 0)
                {
                    if (x + y > allUsers.Count)
                    {
                        y = allUsers.Count - x;
                    }
                    if (allUsers.Count - x >= 20)
                    {
                        y = 20;
                    }
                    else
                    {
                        y = allUsers.Count - x;
                    }
                    usersList.Users = allUsers.GetRange(x, y);
                    usersList.Count = allUsers.Count;
                    return usersList;
                }

                var users = new List<User>();
               // Path = Environment.ContentRootPath;
                users = DB_Access.GetUsersList(Path).Result;

                CacheModel.Add("AllUsers", users);
                // Set cache options
                //var cacheOptions = new MemoryCacheEntryOptions()
                //    .SetSlidingExpiration(TimeSpan.FromSeconds(30));
                //_cache.Set<List<User>>("AllUsers", DB_Access.Instance.Users, cacheOptions);


                allUsers = CacheModel.Get("AllUsers");
                if (x + y > allUsers.Count)
                {
                    y = allUsers.Count - x;
                }
                usersList.Users = allUsers.GetRange(x, y);
                usersList.Count = allUsers.Count;
                return usersList;


            }
            catch (Exception ex)
            {

                return new UsersList()
                {
                    Count = 0,
                    Users = new List<User>()
                };
            }
        }

        // GET api/<TestController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TestController>
        [HttpPost("Add")]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                var users = new List<User>();
                users = DB_Access.GetUsersList(Path).Result;

                var maxId = users.OrderBy(x => x.id).ToList().Last().id + 1;
              //  var user = new User();

             //   user = JsonConvert.DeserializeObject<User>(user);
                user.id = maxId;
                users.Add(user);
                _ = DB_Access.WriteUsersList(Path, System.Text.Json.JsonSerializer.Serialize(users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok("Success");
        }

        // PUT api/<TestController>/5
        [HttpPut("Update")]
        public IActionResult Put([FromBody]User user)
        {
            try
            {

                var users = new List<User>();
                users = DB_Access.GetUsersList(Path).Result;
                int index = users.FindIndex(x => x.id == user.id);
                users[index] = user;
                CacheModel.Delete("AllUsers");
                CacheModel.Add("AllUsers", Users);
                _ = DB_Access.WriteUsersList(Path, System.Text.Json.JsonSerializer.Serialize(users));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok("Success!");
        }

        // DELETE api/<TestController>/5
        [HttpDelete("Delete/{id}")]

        public IActionResult Delete(int id)
        {
            var user = new User();
            // user = JsonConvert.DeserializeObject<User>(value);
            var users = CacheModel.Get("AllUsers");
            bool res = false;
            int index = users.FindIndex(x => x.id == id);
            try
            {
                users.Remove(users[index]);
                index = users.FindIndex(x => x.id == id);
                if (index == -1)
                {
                    _ = DB_Access.WriteUsersList(Path, System.Text.Json.JsonSerializer.Serialize(users));
                    res = true;

                }
               

                if(!users.Exists( x=> x.id == user.id))
                {
                    res = true;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(501, ex.Message);
               
            }
            if (res)
            {
                return Ok("Deleted");
            }
            return Ok("Not Deleted!");
            
        }

       
    }
}
