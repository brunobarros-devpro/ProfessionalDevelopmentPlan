using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.MenuItem
{
    public class MenuItemRepository : IMenuItemRepository
    {
        private readonly ApplicationDbContext _context;

        public MenuItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<IEnumerable<Domain.Entities.MenuItem>> IMenuItemRepository.GetAllByRestaurantAsync(Guid restaurantId)
        {
            return await _context.MenuItems
                .Where(mi => mi.RestaurantId == restaurantId)
                .ToListAsync();
        }
    }
}
