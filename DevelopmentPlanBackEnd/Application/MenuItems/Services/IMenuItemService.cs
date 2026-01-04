using Application.Dtos;

namespace Application.MenuItems.Services
{
    public interface IMenuItemService
    {
        Task<IEnumerable<GetMenuItemDto>> GetAllByRestaurantAsync(Guid restaurantId);
    }
}
