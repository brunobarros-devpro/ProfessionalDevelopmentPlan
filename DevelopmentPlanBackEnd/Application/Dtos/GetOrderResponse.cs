namespace Application.Dtos
{
    public class GetOrderResponse
    {
        public Guid OrderId { get; init; }
        public Guid RestaurantId { get; init; }
        public string Status { get; init; } = default!;
        public decimal Total { get; init; }
        public List<GetOrderItemDto> Items { get; init; } = new();
    }

    public class GetOrderItemDto
    {
        public string Name { get; init; } = default!;
        public decimal UnitPrice { get; init; }
        public int Quantity { get; init; }
        public decimal Total { get; init; }
    }
}
