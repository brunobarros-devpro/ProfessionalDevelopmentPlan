using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.Order
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Domain.Entities.Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Domain.Entities.Order order)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Domain.Entities.Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .Include(o => o.Restaurant)
                .Include(o => o.Customer)
                .ToListAsync();
        }

        public async Task<Domain.Entities.Order?> GetByIdAsync(Guid id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .Include(o => o.Restaurant)
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task UpdateAsync(Domain.Entities.Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderWithItemsAsync(Domain.Entities.Order order, IEnumerable<OrderItem> newItems)
        {
            _context.Orders.Attach(order);
            _context.Entry(order).State = EntityState.Modified;

            var oldItems = await _context.OrderItems.Where(i => i.OrderId == order.Id).ToListAsync();
            _context.OrderItems.RemoveRange(oldItems);
            await _context.SaveChangesAsync();

            foreach (var item in newItems)
            {
                item.OrderId = order.Id;
            }

            await _context.OrderItems.AddRangeAsync(newItems);

            order.TotalAmount = newItems.Sum(i => i.UnitPrice * i.Quantity);

            await _context.SaveChangesAsync();
        }

    }
}
