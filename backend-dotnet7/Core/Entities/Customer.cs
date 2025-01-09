using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string FirstName {  get; set; }
        public string LastName { get; set; }
        public string Email {  get; set; }
        public string Address { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
