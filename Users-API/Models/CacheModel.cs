using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using TestApi.DAL;

namespace TestApi.Models
{
    public static class CacheModel
    {
        private static IMemoryCache _memoryCache = new MemoryCache(new MemoryCacheOptions());
        public static void Add(string cacheKey, List<User> value)
        {
            var cacheExpireOptions = new MemoryCacheEntryOptions()
            {
                AbsoluteExpiration = DateTime.Now.AddDays(50),
                Priority = CacheItemPriority.High,
                SlidingExpiration = TimeSpan.FromDays(20),
            };
            _memoryCache.Set(cacheKey, value, cacheExpireOptions);
        }
        public static List<User> Get(string cacheKey)
        {
            var res = _memoryCache.Get<List<User>>(cacheKey);
            return res;

        }
        public static void Delete(string cacheKey)
        {
            _memoryCache.Remove(cacheKey);      

        }

    }
}
