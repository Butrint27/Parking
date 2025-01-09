using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Category;
using backend_dotnet7.Core.Dtos.Customer;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public CustomerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD


        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerDto dto)
        {

            Customer newCustomer = _mapper.Map<Customer>(dto);


            await _context.Customers.AddAsync(newCustomer);
            await _context.SaveChangesAsync();

            return Ok("Customer Created Successfully");

        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            var convertedCustomers = _mapper.Map<IEnumerable<Customer>>(customers);

            return Ok(convertedCustomers);
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Customer>> GetCustomerById([FromRoute] int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(q => q.Id == id);

            if (customer is null)
            {
                return NotFound("Customer Not Found");
            }

            return Ok(customer);
        }



        //Update

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] int id, [FromBody] CustomerDto dto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(q => q.Id == id);
            if (customer is null)
            {
                return NotFound("Customer Not Found");
            }
            customer.FirstName = dto.FirstName;
            customer.LastName = dto.LastName;
            customer.Email = dto.Email;


            await _context.SaveChangesAsync();
            return Ok("Customer Updated Successfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(q => q.Id == id);
            if (customer is null)
            {
                return NotFound("Customer Not Found");
            }
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return Ok("Customer Deleted");
        }
    }
}
