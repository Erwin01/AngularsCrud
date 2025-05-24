using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Client.WebAPI.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(35)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(50, MinimumLength = 2)]
        public string Address { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

    }
}
