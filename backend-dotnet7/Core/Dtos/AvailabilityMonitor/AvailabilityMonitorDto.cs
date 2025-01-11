namespace backend_dotnet7.Core.Dtos.AvailabilityMonitor
{
    public class AvailabilityMonitorDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime LastCheckedTime { get; set; }
        public TimeSpan UpTime { get; set; }
        public TimeSpan DownTime { get; set; }
        public TimeSpan CheckInterval { get; set; }
        public int ParkingSpaceId { get; set; }
    }
}
