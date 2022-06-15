using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<AppUser> Users {get;set;}
        
        public DbSet<Post> Posts {get;set;}

        public DbSet<Comment> Comments {get;set;}

        public DbSet<Photo> Photos {get;set;}
    
    }
}