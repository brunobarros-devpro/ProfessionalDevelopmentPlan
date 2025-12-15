namespace Application.Dtos
{
    public class CreateOrderResponse
    {
        public Guid OrderId { get; init; }
        public decimal Total { get; init; }
    }
}
