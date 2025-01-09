using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class Ligjeruesi
    {
        [Key]
        public int Id { get; set; }
        public string LecturerName { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Email {  get; set; } = string.Empty;

        public ICollection<Ligjerata> Ligjeratat { get; set; }
    }
}
