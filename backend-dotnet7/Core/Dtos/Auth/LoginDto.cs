using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Dtos.Auth
{
    public class LoginDto
    {
              [Required(ErrorMessage ="Password is required")]


        public string UserName { get; set; }

        public string Password { get; set; }
        
    }
}
