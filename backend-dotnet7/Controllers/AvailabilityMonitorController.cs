using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.AvailabilityMonitor;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvailabilityMonitorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AvailabilityMonitorController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations for AvailabilityMonitor

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateAvailabilityMonitor([FromBody] AvailabilityMonitorDto dto)
        {
            var newMonitor = _mapper.Map<AvailabilityMonitor>(dto);
            newMonitor.LastCheckedTime = DateTime.Now; // Set the current time when it's created
            await _context.AvailabilityMonitors.AddAsync(newMonitor);
            await _context.SaveChangesAsync();
            return Ok("AvailabilityMonitor Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<AvailabilityMonitorDto>>> GetAllAvailabilityMonitors()
        {
            var monitors = await _context.AvailabilityMonitors
                .Include(am => am.ParkingSpace) // Include related ParkingSpace entity
                .ToListAsync();
            var convertedMonitors = _mapper.Map<IEnumerable<AvailabilityMonitorDto>>(monitors);
            return Ok(convertedMonitors);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<AvailabilityMonitorDto>> GetAvailabilityMonitorById([FromRoute] int id)
        {
            var monitor = await _context.AvailabilityMonitors
                .Include(am => am.ParkingSpace) // Include related ParkingSpace entity
                .FirstOrDefaultAsync(q => q.Id == id);

            if (monitor is null)
            {
                return NotFound("AvailabilityMonitor Not Found");
            }

            var monitorDto = _mapper.Map<AvailabilityMonitorDto>(monitor);
            return Ok(monitorDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateAvailabilityMonitor([FromRoute] int id, [FromBody] AvailabilityMonitorDto dto)
        {
            var monitor = await _context.AvailabilityMonitors.FirstOrDefaultAsync(q => q.Id == id);
            if (monitor is null)
            {
                return NotFound("AvailabilityMonitor Not Found");
            }

            monitor.Status = dto.Status;
            monitor.UpTime = dto.UpTime;
            monitor.DownTime = dto.DownTime;
            monitor.CheckInterval = dto.CheckInterval;
            monitor.LastCheckedTime = DateTime.Now; // Set the current time when it is updated

            await _context.SaveChangesAsync();
            return Ok("AvailabilityMonitor Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAvailabilityMonitor([FromRoute] int id)
        {
            var monitor = await _context.AvailabilityMonitors.FirstOrDefaultAsync(q => q.Id == id);
            if (monitor is null)
            {
                return NotFound("AvailabilityMonitor Not Found");
            }

            _context.AvailabilityMonitors.Remove(monitor);
            await _context.SaveChangesAsync();
            return Ok("AvailabilityMonitor Deleted Successfully");
        }
    }
}