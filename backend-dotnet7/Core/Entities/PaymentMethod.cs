using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class PaymentMethod
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Details { get; set; }

        // Navigation property for related Payments
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
