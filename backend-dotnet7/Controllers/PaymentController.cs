using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Payment;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PaymentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentDto dto)
        {
            var newPayment = _mapper.Map<Payment>(dto);
            await _context.Payments.AddAsync(newPayment);
            await _context.SaveChangesAsync();
            return Ok("Payment Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetAllPayments()
        {
            var payments = await _context.Payments
                .Include(p => p.PaymentMethod)  // Including PaymentMethod if necessary
                .Include(p => p.Invoice)  // Including Invoice if necessary
                .ToListAsync();
            var convertedPayments = _mapper.Map<IEnumerable<PaymentDto>>(payments);
            return Ok(convertedPayments);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<PaymentDto>> GetPaymentById([FromRoute] int id)
        {
            var payment = await _context.Payments
                .Include(p => p.PaymentMethod)  // Include PaymentMethod if necessary
                .Include(p => p.Invoice)  // Include Invoice if necessary
                .FirstOrDefaultAsync(q => q.Id == id);
            if (payment is null)
            {
                return NotFound("Payment Not Found");
            }
            var paymentDto = _mapper.Map<PaymentDto>(payment);
            return Ok(paymentDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdatePayment([FromRoute] int id, [FromBody] PaymentDto dto)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(q => q.Id == id);
            if (payment is null)
            {
                return NotFound("Payment Not Found");
            }

            payment.Amount = dto.Amount;
            payment.Date = dto.Date;
            payment.Status = dto.Status;

            await _context.SaveChangesAsync();
            return Ok("Payment Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeletePayment([FromRoute] int id)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(q => q.Id == id);
            if (payment is null)
            {
                return NotFound("Payment Not Found");
            }
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
            return Ok("Payment Deleted");
        }
    }
}
