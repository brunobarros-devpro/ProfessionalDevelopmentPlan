using Domain.Entities.Common;

namespace Domain.Entities
{
    public class Restaurant : Entity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public bool IsOpen { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
