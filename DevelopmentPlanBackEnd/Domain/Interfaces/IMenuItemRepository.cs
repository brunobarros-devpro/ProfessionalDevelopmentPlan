using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IMenuItemRepository
    {
        Task<IEnumerable<MenuItem>> GetAllByRestaurantAsync(Guid restaurantId);
    }
}
