using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;

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

        public async Task<Domain.Entities.Order?> GetByIdAsync(Guid id)
        {
            return await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi=> oi.MenuItem)
                .Include(o => o.Restaurant)
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
