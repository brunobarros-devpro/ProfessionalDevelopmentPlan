using Domain.Entities.Costumer;

namespace Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer?> GetByIdAsync(Guid id);
    }
}
