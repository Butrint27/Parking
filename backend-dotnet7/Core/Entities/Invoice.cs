using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateGenerated { get; set; }
        public decimal TotalAmount { get; set; }

        // Navigation property for related Payments
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
