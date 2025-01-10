namespace backend_dotnet7.Core.Dtos.Payment
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; }
    }
}
