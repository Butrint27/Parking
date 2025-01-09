using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; }= string.Empty;
        public decimal Price { get; set; }
        public string Brand {  get; set; }=string.Empty;
        public int CategoryId { get; set; }
        public Category Category { get; set; }

    }
}
