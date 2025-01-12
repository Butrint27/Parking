using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.ParkingSpace;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingSpaceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ParkingSpaceController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations for ParkingSpace

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateParkingSpace([FromBody] ParkingSpaceDto dto)
        {
            var newParkingSpace = _mapper.Map<ParkingSpace>(dto);
            newParkingSpace.CreatedAt = DateTime.Now;
            newParkingSpace.UpdatedAt = DateTime.Now;

            await _context.ParkingSpaces.AddAsync(newParkingSpace);
            await _context.SaveChangesAsync();
            return Ok("ParkingSpace Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ParkingSpaceDto>>> GetAllParkingSpaces()
        {
            var parkingSpaces = await _context.ParkingSpaces
                .Include(ps => ps.ParkingSpaceManagers)
                .Include(ps => ps.AvailabilityMonitor)
                .ToListAsync();
            var convertedParkingSpaces = _mapper.Map<IEnumerable<ParkingSpaceDto>>(parkingSpaces);
            return Ok(convertedParkingSpaces);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ParkingSpaceDto>> GetParkingSpaceById([FromRoute] int id)
        {
            var parkingSpace = await _context.ParkingSpaces
                .Include(ps => ps.ParkingSpaceManagers)
                .Include(ps => ps.AvailabilityMonitor)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (parkingSpace is null)
            {
                return NotFound("ParkingSpace Not Found");
            }

            var parkingSpaceDto = _mapper.Map<ParkingSpaceDto>(parkingSpace);
            return Ok(parkingSpaceDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateParkingSpace([FromRoute] int id, [FromBody] ParkingSpaceDto dto)
        {
            var parkingSpace = await _context.ParkingSpaces.FirstOrDefaultAsync(q => q.Id == id);
            if (parkingSpace is null)
            {
                return NotFound("ParkingSpace Not Found");
            }

            parkingSpace.Location = dto.Location;
            parkingSpace.Size = dto.Size;
            parkingSpace.Status = dto.Status;
            parkingSpace.PricePerHour = dto.PricePerHour;
            parkingSpace.UpdatedAt = DateTime.Now;

            // If there are any related AvailabilityMonitor or ParkingSpaceManagers, update them if needed


            // Save changes
            await _context.SaveChangesAsync();
            return Ok("ParkingSpace Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteParkingSpace([FromRoute] int id)
        {
            var parkingSpace = await _context.ParkingSpaces.FirstOrDefaultAsync(q => q.Id == id);
            if (parkingSpace is null)
            {
                return NotFound("ParkingSpace Not Found");
            }

            _context.ParkingSpaces.Remove(parkingSpace);
            await _context.SaveChangesAsync();
            return Ok("ParkingSpace Deleted Successfully");
        }
    }
}