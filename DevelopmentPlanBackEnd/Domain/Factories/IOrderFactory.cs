using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Factories
{
    public interface IOrderFactory
    {
        Order Create(Guid restaurantId, IEnumerable<(Guid menuItemId, int quantity, decimal unitPrice)> items);
    }
}
