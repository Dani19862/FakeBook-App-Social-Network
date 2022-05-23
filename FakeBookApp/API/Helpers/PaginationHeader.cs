namespace API.Helpers
{
    public class PaginationHeader  // the source that return from client to server in Header
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        
        public PaginationHeader(int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemPerPage = itemPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;

        }
    
    }
}