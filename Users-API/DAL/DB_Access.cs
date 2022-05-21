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
using TestApi.Models;

namespace TestApi.DAL
{
    /// <summary>
    /// Mocking Database From Json File
    /// </summary>
    public class DB_Access
    {
        private DB_Access()
        {


        }
        public List<User> Users { get; set; }
        private static readonly object lck = new object ();  
  //  private static DB_Access _instance = null;
      
        public static async Task<List<User>> SetUsersList()
        {
            var allUsers = new List<User>();
            allUsers = CacheModel.Get("AllUsers");
            if (allUsers != null && allUsers.Count > 0)
            {
                return allUsers;
            }

            return  await JsonFileReader.ReadAsync<List<User>>(@"DAL\MOCK_DATA.json"); 
        }



        public static void WriteUsersList(string text)
        {

          JsonFileWriter.WriteJson(@"DAL\MOCK_DATA.json", text);
        }

    }
    
    public static class JsonFileReader
    {
        public static async Task<T> ReadAsync<T>(string filePath)
        {
            using FileStream stream = System.IO.File.OpenRead(filePath);
            return await System.Text.Json.JsonSerializer.DeserializeAsync<T>(stream);
        }
    }

    public static class JsonFileWriter    {
        public static  void WriteJson(string filePath, string text)
        {
            System.IO.File.WriteAllText(filePath, text);
            //return await System.Text.Json.JsonSerializer.DeserializeAsync<T>(stream);
        }
    }

    public class User
    {    
            public int id { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string email { get; set; }
            public string gender { get; set; }
            public string city { get; set; }
            public string strt_addrss { get; set; }
        public string phone { get; set; }
        public string job { get; set; }
        public string pic { get; set; }
        public int Count { get; set; }

    } 
    
    public class UsersList
    {
        public List<User> Users { get; set;}
        public int Count { get; set; }
    }
}
