using Application.MenuItems.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Orders
{
    [ApiController]
    [Route("api/menuItems")]
    [EnableCors("SecureCors")]
    public class MenuItemController : Controller
    {
        private readonly IMenuItemService _menuItemService;

        public MenuItemController(IMenuItemService menuItemService)
        {
            _menuItemService = menuItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllByRestaurant([FromQuery] Guid restaurantId)
        {
            var items = await _menuItemService.GetAllByRestaurantAsync(restaurantId);
            return Ok(items);
        }
    }
}
