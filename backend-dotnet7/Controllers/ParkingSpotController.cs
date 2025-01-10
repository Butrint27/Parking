using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.ParkingSpot;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingSpotController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public ParkingSpotController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateParkingSpot([FromBody] ParkingSpotDTO dto)
        {
            var newParkingSpot = _mapper.Map<ParkingSpot>(dto);
            await _context.ParkingSpots.AddAsync(newParkingSpot);
            await _context.SaveChangesAsync();
            return Ok("Parking Spot Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ParkingSpotDTO>>> GetAllParkingSpots()
        {
            var parkingSpots = await _context.ParkingSpots.ToListAsync();
            var convertedParkingSpots = _mapper.Map<IEnumerable<ParkingSpotDTO>>(parkingSpots);
            return Ok(convertedParkingSpots);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ParkingSpot>> GetParkingSpotById([FromRoute] int id)
        {
            var parkingSpot = await _context.ParkingSpots.FirstOrDefaultAsync(q => q.Id == id);
            if (parkingSpot is null)
            {
                return NotFound("Parking Spot Not Found");
            }
            return Ok(parkingSpot);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateParkingSpot([FromRoute] int id, [FromBody] ParkingSpotDTO dto)
        {
            var parkingSpot = await _context.ParkingSpots.FirstOrDefaultAsync(q => q.Id == id);
            if (parkingSpot is null)
            {
                return NotFound("Parking Spot Not Found");
            }

    
            parkingSpot.Location = dto.Location;
            parkingSpot.Size = dto.Size;
            parkingSpot.Status = dto.Status;
            parkingSpot.PricePerHour = dto.PricePerHour;

            await _context.SaveChangesAsync();
            return Ok("Parking Spot Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteParkingSpot([FromRoute] int id)
        {
            var parkingSpot = await _context.ParkingSpots.FirstOrDefaultAsync(q => q.Id == id);
            if (parkingSpot is null)
            {
                return NotFound("Parking Spot Not Found");
            }
            _context.ParkingSpots.Remove(parkingSpot);
            await _context.SaveChangesAsync();
            return Ok("Parking Spot Deleted");
        }
    }
}
