using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Ligjerata
    {
        [Key]
        public int Id { get; set; }
        public string LectureName { get; set; } = string.Empty;
        public int LigjeruesiId { get; set; }
        public Ligjeruesi Ligjeruesi { get; set; }
    }
}
