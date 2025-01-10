namespace backend_dotnet7.Core.Dtos.Invoice
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public DateTime DateGenerated { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
