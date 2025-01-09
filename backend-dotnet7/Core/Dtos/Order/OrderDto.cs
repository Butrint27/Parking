namespace backend_dotnet7.Core.Dtos.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public decimal Price { get; set; }
        public string Address { get; set; }
        public string PaymentMethod {  get; set; }
        public int CustomerId {  get; set; }
    }    
}
