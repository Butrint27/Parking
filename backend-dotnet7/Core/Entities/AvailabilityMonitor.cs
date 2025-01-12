using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class AvailabilityMonitor
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime LastCheckedTime { get; set; }
        public DateTime UpTime { get; set; }
        public DateTime DownTime { get; set; }
        public DateTime CheckInterval { get; set; }

        // Foreign key to ParkingSpace
        public int ParkingSpaceId { get; set; }
        public ParkingSpace ParkingSpace { get; set; }
    }
}
