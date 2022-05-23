using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList <T> : List<T>
    {
        public int CurrentPage { get; set; }   
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }


        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            this.CurrentPage = pageNumber;
            this.TotalPages = (int)Math.Ceiling(count / (float)pageSize);  // ceil rounds up to the next whole number 
            this.PageSize = pageSize;
            this.AddRange(items);
            TotalCount = count; 
        }

        // Method to create a paged list from a generic list of objects
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize) 
        {
            var count = await source.CountAsync();   // count the number of items in the list
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();  // get the items for the current page
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
   
}