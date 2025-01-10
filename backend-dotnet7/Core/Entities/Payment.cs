using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; }

        // Foreign key to PaymentMethod
        public int PaymentMethodId { get; set; }
        [ForeignKey("PaymentMethodId")]
        public PaymentMethod PaymentMethod { get; set; }

        // Foreign key to Invoice
        public int InvoiceId { get; set; }
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }
    }

}

