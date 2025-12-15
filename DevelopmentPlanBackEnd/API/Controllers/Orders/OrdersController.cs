using Application.Dtos;
using Application.Orders.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Orders
{

    [ApiController]
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
        {
            var result = await _orderService.CreateOrderAsync(request);
            return CreatedAtAction(nameof(Create), new { id = result.OrderId }, result);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order is null)
                return NotFound();

            return Ok(order);
        }
    }
}
