using Application.Dtos;
using Domain.Interfaces;

namespace Application.MenuItems.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly IMenuItemRepository _menuItemRepository;

        public MenuItemService(IMenuItemRepository menuItemRepository)
        {
            _menuItemRepository = menuItemRepository;
        }

        public async Task<IEnumerable<GetMenuItemDto>> GetAllByRestaurantAsync(Guid restaurantId)
        {
            var items = await _menuItemRepository.GetAllByRestaurantAsync(restaurantId);
            return items.Select(i => new GetMenuItemDto
            {
                Id = i.Id,
                Name = i.Name,
                Price = i.Price
            });
        }
    }
}
