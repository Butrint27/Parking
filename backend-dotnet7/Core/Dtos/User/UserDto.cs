using backend_dotnet7.Core.Dtos.UserProfile;

namespace backend_dotnet7.Core.Dtos.User
{
    public class UserDto
    {
        public string Username { get; set; }


        public string Email { get; set; }
        public UserProfileDto UserProfile { get; set; }
    }
}
