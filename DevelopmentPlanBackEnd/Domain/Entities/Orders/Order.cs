using Domain.Entities.Common;
using Domain.Entities.Costumer;

namespace Domain.Entities
{
    public class Order : Entity
    {
        public Guid CustomerId { get; set; }
        public Guid RestaurantId { get; set; }
        public string Status { get; set; } = null!;
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }

        public Customer Customer { get; set; } = null!;
        public Restaurant Restaurant { get; set; } = null!;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
