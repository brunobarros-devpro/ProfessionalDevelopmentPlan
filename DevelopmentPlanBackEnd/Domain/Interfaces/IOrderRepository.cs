using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task AddAsync(Order order);
        Task<Order?> GetByIdAsync(Guid id);
        Task<IEnumerable<Order>> GetAllAsync();
        Task DeleteAsync(Order order);
        Task UpdateAsync(Order order);
        Task UpdateOrderWithItemsAsync(Order order, IEnumerable<OrderItem> newItems);
    }
}
