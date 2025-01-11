namespace backend_dotnet7.Core.Dtos.Reservation
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ParkingSpotId { get; set; }
        public int ParkingReservationManagerId { get; set; }
    }
}
