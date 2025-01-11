using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class AvailabilityMonitor
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime LastCheckedTime { get; set; }
        public TimeSpan UpTime { get; set; }
        public TimeSpan DownTime { get; set; }
        public TimeSpan CheckInterval { get; set; }

        // Foreign key to ParkingSpace
        public int ParkingSpaceId { get; set; }
        public ParkingSpace ParkingSpace { get; set; }
    }
}
