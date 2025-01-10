using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class ParkingReservationManager
    {
        [Key]

        public int Id { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }

        //Navigation Property for related reservations

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    }
}


