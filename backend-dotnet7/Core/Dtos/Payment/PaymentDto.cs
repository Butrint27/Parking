using System.ComponentModel.DataAnnotations.Schema;

namespace backend_dotnet7.Core.Dtos.Payment
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; }
        public int PaymentMethodId { get; set; }
        // Foreign key to Invoice
        public int InvoiceId { get; set; }
    }
}
