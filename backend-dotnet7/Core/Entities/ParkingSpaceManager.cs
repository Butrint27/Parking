using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class ParkingSpaceManager
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; }
        public decimal Pagesa { get; set; }
        public string Kontakti { get; set; }

        // Foreign key to ParkingSpace
        public int ParkingSpaceId { get; set; }
        public ParkingSpace ParkingSpace { get; set; }
    }
}
