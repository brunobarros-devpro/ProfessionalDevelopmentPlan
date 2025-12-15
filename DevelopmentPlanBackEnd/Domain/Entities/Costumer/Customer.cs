using Domain.Entities.Common;

namespace Domain.Entities.Costumer
{
    public class Customer : Entity
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
