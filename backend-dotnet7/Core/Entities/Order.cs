using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }= DateTime.Now;
        public decimal Price { get; set; }
        public string Address {  get; set; }=string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public int CustomerId {  get; set; }
        public Customer Customer { get; set; }
    }
}
