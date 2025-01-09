using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Order;
using backend_dotnet7.Core.Dtos.Product;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public OrderController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD


        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto dto)
        {

            Order newOrder = _mapper.Map<Order>(dto);


            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            return Ok("Order Created Successfully");

        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            var convertedOrders = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(convertedOrders);
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Order>> GetOrderById([FromRoute] int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(q => q.Id == id);

            if (order is null)
            {
                return NotFound("Order Not Found");
            }

            return Ok(order);
        }

        //Update

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int id, [FromBody] OrderDto dto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(q => q.Id == id);
            if (order is null)
            {
                return NotFound("Order Not Found");
            }

            order.Price = dto.Price;
            order.Address = dto.Address;
            order.PaymentMethod = dto.PaymentMethod;
            


            await _context.SaveChangesAsync();
            return Ok("Order Updated Successfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(q => q.Id == id);
            if (order is null)
            {
                return NotFound("Order Not Found");
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return Ok("Order Deleted");
        }
    }
}
