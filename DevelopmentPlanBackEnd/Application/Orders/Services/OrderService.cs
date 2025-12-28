using Application.Dtos;
using Domain.Entities;
using Domain.Factories;
using Domain.Interfaces;

namespace Application.Orders.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderFactory _orderFactory;

        public OrderService(IOrderRepository orderRepository, IOrderFactory orderFactory)
        {
            _orderRepository = orderRepository;
            _orderFactory = orderFactory;
        }

        public async Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request)
        {
            var items = request.Items.Select(i => (i.MenuItemId, i.Quantity, i.UnitPrice));
            var order = _orderFactory.Create(request.RestaurantId, items);
            order.CustomerId = request.CustomerId;
            await _orderRepository.AddAsync(order);

            return new CreateOrderResponse
            {
                OrderId = order.Id,
                Total = order.TotalAmount
            };
        }

        public async Task<IEnumerable<GetOrderResponse>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllAsync();

            return orders.Select(order => new GetOrderResponse
            {
                OrderId = order.Id,
                RestaurantId = order.RestaurantId,
                Status = order.Status,
                Total = order.TotalAmount,
                Items = order.OrderItems.Select(i => new GetOrderItemDto
                {
                    Name = i.MenuItem?.Name ?? string.Empty,
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                    Total = (i.Quantity * i.UnitPrice),
                }).ToList()
            });
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
                Status = order.Status,
                Total = order.TotalAmount,
                Items = order.OrderItems.Select(i => new GetOrderItemDto
                {
                    Name = i.MenuItem?.Name ?? string.Empty,
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                    Total = (i.Quantity * i.UnitPrice)
                }).ToList()
            };
        }

        public async Task<GetOrderResponse?> UpdateOrderAsync(Guid orderId, UpdateOrderRequest request)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order is null)
                return null;

            order.Status = request.Status;

            var newItems = request.Items.Select(item => new OrderItem
            {
                MenuItemId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                OrderId = order.Id
            }).ToList();

            await _orderRepository.UpdateOrderWithItemsAsync(order, newItems);
            order = await _orderRepository.GetByIdAsync(orderId);

            return new GetOrderResponse
            {
                OrderId = order.Id,
                RestaurantId = order.RestaurantId,
                Status = order.Status,
                Total = order.TotalAmount,
                Items = order.OrderItems.Select(i => new GetOrderItemDto
                {
                    Name = i.MenuItem?.Name ?? string.Empty,
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                    Total = (i.Quantity * i.UnitPrice)
                }).ToList()
            };
        }

        public async Task<bool> DeleteOrderAsync(Guid orderId)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order is null)
                return false;

            await _orderRepository.DeleteAsync(order);
            return true;
        }
    }

}
