using Application.Dtos;

namespace Application.Orders.Services
{
    public interface IOrderService
    {
        Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request);
        Task<GetOrderResponse?> GetOrderByIdAsync(Guid orderId);
        Task<IEnumerable<GetOrderResponse>> GetAllOrdersAsync();
        Task<GetOrderResponse?> UpdateOrderAsync(Guid orderId, UpdateOrderRequest request);
        Task<bool> DeleteOrderAsync(Guid orderId);
    }
}
