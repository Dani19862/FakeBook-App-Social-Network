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

        public DbSet<Like> Likes {get;set;}


        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
            
        //     modelBuilder.Entity<Comment>()
        //         .HasOne(c => c.Post)
        //         .WithMany(p => p.Comments)
        //         .OnDelete(DeleteBehavior.Cascade);
            
        //     modelBuilder.Entity<Photo>()
        //         .HasOne(p => p.AppUser)
        //         .WithMany(u => u.Photos)
        //         .OnDelete(DeleteBehavior.Cascade);
            
        //     modelBuilder.Entity<Like>()
        //         .HasOne(l => l.Post)
        //         .WithMany(p => p.Likes)
        //         .HasForeignKey(l => l.PostId)
        //         .OnDelete(DeleteBehavior.Cascade);

            
                
        // }


    
    }
}