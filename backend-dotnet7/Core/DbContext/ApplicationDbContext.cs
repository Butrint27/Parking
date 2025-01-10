using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace backend_dotnet7.Core.DbContext
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {

        }

        public DbSet<Log> Logs { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ParkingSpot> ParkingSpots { get; set; }
        public DbSet<ParkingReservationManager> ParkingReservationManagers { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            //Configure relationship
            builder.Entity<Reservation>()
                .HasOne(r => r.ParkingSpot)
                .WithMany(ps => ps.Reservations)
                .HasForeignKey(r => r.ParkingSpotId);

            builder.Entity<Reservation>()
                .HasOne(r => r.ParkingReservationManager)
                .WithMany(prm => prm.Reservations)
                .HasForeignKey(r => r.ParkingReservationManagerId);


            //1
            builder.Entity<ApplicationUser>(e =>
            {
                e.ToTable("Users");
            });

            //2
            builder.Entity<IdentityUserClaim<string>>(e =>
            {
                e.ToTable("UserClaims");
            });

            //3
            builder.Entity<IdentityUserLogin<string>>(e =>
            {
                e.ToTable("UserLogins");
            });

            //4
            builder.Entity<IdentityUserToken<string>>(e =>
            {
                e.ToTable("UserTokens");
            });

            //5
            builder.Entity<IdentityRole>(e =>
            {
                e.ToTable("Roles");
            });

            //6
            builder.Entity<IdentityRoleClaim<string>>(e =>
            {
                e.ToTable("RoleClaims");
            });

            //7
            builder.Entity<IdentityUserRole<string>>(e =>
            {
                e.ToTable("UserRoles");
            });
        }
    }
}
