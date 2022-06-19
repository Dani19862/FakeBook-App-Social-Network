namespace API.Helpers
{
    public class PostParams : PaginationParams
    {
        
        // private const int MaxPageSize = 50;
        // public int PageNumber { get; set; } = 1;
        // private int pageSize = 10;
        // public int PageSize
        // {
        //     get { return pageSize; }
        //     set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }

        // }

        //public string CurrentUsername { get; set; }

        //public int AppUserId { get; set; }

        public string Search { get; set; }
        
        

        

    }
}