namespace backend_dotnet7.Core.Dtos.AvailabilityMonitor
{
    public class AvailabilityMonitorDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime LastCheckedTime { get; set; }
        public DateTime UpTime { get; set; }
        public DateTime DownTime { get; set; }
        public DateTime CheckInterval { get; set; }
        public int ParkingSpaceId { get; set; }
    }
}
