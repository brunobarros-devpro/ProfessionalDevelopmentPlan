using Domain.Entities.Common;

namespace Domain.Entities
{
    public class MenuItem : Entity
    {
        public Guid Id { get; set; }
        public Guid RestaurantId { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }

        public Restaurant Restaurant { get; set; } = null!;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
