using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Status { get; set; }

        public decimal TotalAmount { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        //Foreign Key to Parking Spot

        public int ParkingSpotId { get; set; }
        public ParkingSpot ParkingSpot { get; set; }

        //Foreign Key to Parking Reservation Manager
        public int ParkingReservationManagerId { get; set; }
        public ParkingReservationManager ParkingReservationManager { get; set; }


    }
}
