using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Invoice;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public InvoiceController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceDto dto)
        {
            var newInvoice = _mapper.Map<Invoice>(dto);
            await _context.Invoices.AddAsync(newInvoice);
            await _context.SaveChangesAsync();
            return Ok("Invoice Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetAllInvoices()
        {
            var invoices = await _context.Invoices.ToListAsync();
            var convertedInvoices = _mapper.Map<IEnumerable<InvoiceDto>>(invoices);
            return Ok(convertedInvoices);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<InvoiceDto>> GetInvoiceById([FromRoute] int id)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(q => q.Id == id);
            if (invoice is null)
            {
                return NotFound("Invoice Not Found");
            }
            var invoiceDto = _mapper.Map<InvoiceDto>(invoice);
            return Ok(invoiceDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateInvoice([FromRoute] int id, [FromBody] InvoiceDto dto)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(q => q.Id == id);
            if (invoice is null)
            {
                return NotFound("Invoice Not Found");
            }

            invoice.DateGenerated = dto.DateGenerated;
            invoice.TotalAmount = dto.TotalAmount;

            await _context.SaveChangesAsync();
            return Ok("Invoice Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteInvoice([FromRoute] int id)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(q => q.Id == id);
            if (invoice is null)
            {
                return NotFound("Invoice Not Found");
            }
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return Ok("Invoice Deleted");
        }
    }
}
