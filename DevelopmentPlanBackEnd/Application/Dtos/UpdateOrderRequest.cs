namespace Application.Dtos
{
    public class UpdateOrderRequest
    {
        public string Status { get; init; } = default!;
        public List<UpdateOrderItemDto> Items { get; init; } = new();
    }

    public class UpdateOrderItemDto
    {
        public Guid MenuItemId { get; init; }
        public int Quantity { get; init; }
        public decimal UnitPrice { get; set; }
    }
}
