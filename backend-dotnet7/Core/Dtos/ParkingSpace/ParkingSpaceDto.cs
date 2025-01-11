namespace backend_dotnet7.Core.Dtos.ParkingSpace
{
    public class ParkingSpaceDto
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Size { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public decimal PricePerHour { get; set; }
    }
}
