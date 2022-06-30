namespace API.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string UserName { get; set; } // currently logged in user
        public string Container { get; set; } = "Unread"; // we return by default the unread messages
    }
}