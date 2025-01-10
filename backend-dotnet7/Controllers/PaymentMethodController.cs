using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.PaymentMethod;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PaymentMethodController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreatePaymentMethod([FromBody] PaymentMethodDto dto)
        {
            var newPaymentMethod = _mapper.Map<PaymentMethod>(dto);
            await _context.PaymentMethods.AddAsync(newPaymentMethod);
            await _context.SaveChangesAsync();
            return Ok("Payment Method Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<PaymentMethodDto>>> GetAllPaymentMethods()
        {
            var paymentMethods = await _context.PaymentMethods.ToListAsync();
            var convertedPaymentMethods = _mapper.Map<IEnumerable<PaymentMethodDto>>(paymentMethods);
            return Ok(convertedPaymentMethods);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<PaymentMethodDto>> GetPaymentMethodById([FromRoute] int id)
        {
            var paymentMethod = await _context.PaymentMethods.FirstOrDefaultAsync(q => q.Id == id);
            if (paymentMethod is null)
            {
                return NotFound("Payment Method Not Found");
            }
            var paymentMethodDto = _mapper.Map<PaymentMethodDto>(paymentMethod);
            return Ok(paymentMethodDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdatePaymentMethod([FromRoute] int id, [FromBody] PaymentMethodDto dto)
        {
            var paymentMethod = await _context.PaymentMethods.FirstOrDefaultAsync(q => q.Id == id);
            if (paymentMethod is null)
            {
                return NotFound("Payment Method Not Found");
            }

       
            paymentMethod.Type = dto.Type;
            paymentMethod.Details = dto.Details;

            await _context.SaveChangesAsync();
            return Ok("Payment Method Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeletePaymentMethod([FromRoute] int id)
        {
            var paymentMethod = await _context.PaymentMethods.FirstOrDefaultAsync(q => q.Id == id);
            if (paymentMethod is null)
            {
                return NotFound("Payment Method Not Found");
            }
            _context.PaymentMethods.Remove(paymentMethod);
            await _context.SaveChangesAsync();
            return Ok("Payment Method Deleted");
        }
    }
}
