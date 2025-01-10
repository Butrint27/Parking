using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }

       
        public string FirstName { get; set; }

        
        public string LastName { get; set; }

       
        public string Address { get; set; }

       
        public string PhoneNumber { get; set; }

        // Foreign key to User
        public int UserId { get; set; }
 
        public User User { get; set; }
    }
}
