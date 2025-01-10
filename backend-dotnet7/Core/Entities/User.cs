using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

       
        public string Username { get; set; }

        
        public string Email { get; set; }

        
        public string Role { get; set; }

        // Navigation property for UserProfile
        public UserProfile UserProfile { get; set; }
    }
}
