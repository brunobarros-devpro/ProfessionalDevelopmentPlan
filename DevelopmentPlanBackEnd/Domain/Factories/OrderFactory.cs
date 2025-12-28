using Domain.Entities;
using Domain.Entities.Costumer;

namespace Domain.Factories
{
    public class OrderFactory : IOrderFactory
    {
        public Order Create(Guid restaurantId, IEnumerable<(Guid menuItemId, int quantity, decimal unitPrice)> items)
        {
            var order = new Order
            {
                RestaurantId = restaurantId,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                OrderItems = new List<OrderItem>(),                
            };

            foreach (var item in items)
            {
                order.OrderItems.Add(new OrderItem
                {
                    MenuItemId = item.menuItemId,
                    Quantity = item.quantity,
                    UnitPrice = item.unitPrice
                });
            }

            order.TotalAmount = order.OrderItems.Sum(i => i.UnitPrice * i.Quantity);

            return order;
        }
    }
}
