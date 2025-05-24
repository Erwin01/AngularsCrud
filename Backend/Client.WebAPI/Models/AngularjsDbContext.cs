using Microsoft.EntityFrameworkCore;

namespace Client.WebAPI.Models
{
    public class AngularjsDbContext : DbContext
    {
        public AngularjsDbContext(DbContextOptions<AngularjsDbContext> options): base(options)
        {
                
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            base.OnModelCreating(modelBuilder);
        }


        public DbSet<User> Users { get; set; }
    }
}
