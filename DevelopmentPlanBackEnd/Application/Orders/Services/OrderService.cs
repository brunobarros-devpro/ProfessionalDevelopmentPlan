using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Orders.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request)
        {
            var order = new Order();

            foreach (var item in request.Items)
            {
                //order.AddItem(item.Name, item.UnitPrice, item.Quantity);
            }

            await _orderRepository.AddAsync(order);

            return new CreateOrderResponse
            {
                OrderId = order.Id,
            };
        }

        public async Task<GetOrderResponse?> GetOrderByIdAsync(Guid orderId)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);

            if (order is null)
                return null;

            return new GetOrderResponse
            {
                OrderId = order.Id,
                RestaurantId = order.RestaurantId,
                Status = order.Status.ToString(),
                Items = order.OrderItems.Select(i => new GetOrderItemDto
                {
                    Name = i.MenuItem.Name,
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                }).ToList()
            };
        }
    }

}
