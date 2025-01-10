namespace backend_dotnet7.Core.Dtos.ParkingSpot
{
    public class ParkingSpotDTO
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Size { get; set; }
        public string Status { get; set; }
        public decimal PricePerHour { get; set; }
    }
}
