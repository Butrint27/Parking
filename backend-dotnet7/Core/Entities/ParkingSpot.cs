using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class ParkingSpot
    {
        [Key]
        public int Id { get; set; }

        public string Location { get; set; }
        public string Size { get; set; }
        public string Status { get; set; }

        public decimal PricePerHour { get; set; }

        //Navigation property for related Reservations

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    }
}
