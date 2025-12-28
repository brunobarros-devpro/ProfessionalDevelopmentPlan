using Application.Dtos;
using Application.Orders.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Orders
{

    [ApiController]
    [Route("api/orders")]
    [EnableCors("SecureCors")]
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
            return CreatedAtAction(nameof(GetById), new { id = result.OrderId }, result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order is null)
                return NotFound();

            return Ok(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOrderRequest request)
        {
            var updatedOrder = await _orderService.UpdateOrderAsync(id, request);

            if (updatedOrder is null)
                return NotFound();

            return Ok(updatedOrder);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _orderService.DeleteOrderAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }


        [HttpPost("gc/collect")]
        public IActionResult ForceGarbageCollection()
        {
            // 1. Allocate temporary objects to simulate memory garbage.
            //    These objects are stored only to consume memory briefly.
            var garbage = new List<byte[]>();
            for (int i = 0; i < 500; i++)
            {
                garbage.Add(new byte[1024 * 20]); // 20 KB each (~10MB total)
            }

            // 2. Capture memory usage and GC generation collection counters before running GC.
            long memoryBefore = GC.GetTotalMemory(false);
            int gen0Before = GC.CollectionCount(0);
            int gen1Before = GC.CollectionCount(1);
            int gen2Before = GC.CollectionCount(2);

            // 3. Remove references to make allocated objects eligible for garbage collection.
            //    After this point, the GC is allowed to clean them up.
            garbage.Clear();
            garbage = null!; // Drop the reference so GC can collect the objects

            // 4. Force the Garbage Collector to run.
            //    The first call collects unreferenced objects.
            GC.Collect();

            // 5. Wait for objects that have finalizers to complete their cleanup process.
            //    This ensures any finalization logic finishes before the next GC pass.
            GC.WaitForPendingFinalizers();

            // 6. Run GC a second time to clean up finalized objects as well.
            GC.Collect();

            // 7. Capture memory usage and GC counters again after cleanup.
            long memoryAfter = GC.GetTotalMemory(false);
            int gen0After = GC.CollectionCount(0);
            int gen1After = GC.CollectionCount(1);
            int gen2After = GC.CollectionCount(2);

            // 8. Return educational metrics showing how GC behaved.
            //    This helps learners observe memory reduction and generational collection behavior.
            return Ok(new
            {
                MemoryBeforeKB = memoryBefore / 1024,
                MemoryAfterKB = memoryAfter / 1024,
                FreedMemoryKB = (memoryBefore - memoryAfter) / 1024,

                // Number of new GC runs triggered in this request
                CollectionsGen0 = gen0After - gen0Before,
                CollectionsGen1 = gen1After - gen1Before,
                CollectionsGen2 = gen2After - gen2Before,

                // Total GC collection counts since the process started
                TotalRunsGen0 = gen0After,
                TotalRunsGen1 = gen1After,
                TotalRunsGen2 = gen2After,

                Message = "GC executed manually. Temporary objects were de-referenced and memory was cleaned up."
            });
        }

    }
}
