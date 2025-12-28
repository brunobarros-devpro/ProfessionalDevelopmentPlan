namespace Application.Dtos
{
    public class CreateOrderRequest
    {
        public Guid RestaurantId { get; init; }
        public Guid CustomerId { get; init; }
        public List<CreateOrderItemDto> Items { get; init; } = new();
    }

    public class CreateOrderItemDto
    {
        public Guid MenuItemId { get; set; }
        public string Name { get; init; } = default!;
        public decimal UnitPrice { get; init; }
        public int Quantity { get; init; }
    }
}
