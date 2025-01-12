using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Entities
{
    public class TesetPerDb
    {
        [Key]
        public int Id { get; set; }
        public int MyProperty1 { get; set; }
    }
}
