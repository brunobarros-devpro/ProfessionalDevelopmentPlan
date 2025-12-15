using Application.Dtos;

namespace Application.Orders.Services
{
    public interface IOrderService
    {
        Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request);
        Task<GetOrderResponse?> GetOrderByIdAsync(Guid orderId);
    }
}
