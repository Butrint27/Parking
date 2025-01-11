using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.ParkingSpaceManager;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingSpaceManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ParkingSpaceManagerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations for ParkingSpaceManager

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateParkingSpaceManager([FromBody] ParkingSpaceManagerDto dto)
        {
            var newManager = _mapper.Map<ParkingSpaceManager>(dto);
            await _context.ParkingSpaceManagers.AddAsync(newManager);
            await _context.SaveChangesAsync();
            return Ok("ParkingSpaceManager Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ParkingSpaceManagerDto>>> GetAllParkingSpaceManagers()
        {
            var managers = await _context.ParkingSpaceManagers
                .Include(psm => psm.ParkingSpace) // Include the related ParkingSpace entity
                .ToListAsync();
            var convertedManagers = _mapper.Map<IEnumerable<ParkingSpaceManagerDto>>(managers);
            return Ok(convertedManagers);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ParkingSpaceManagerDto>> GetParkingSpaceManagerById([FromRoute] int id)
        {
            var manager = await _context.ParkingSpaceManagers
                .Include(psm => psm.ParkingSpace) // Include the related ParkingSpace entity
                .FirstOrDefaultAsync(q => q.Id == id);

            if (manager is null)
            {
                return NotFound("ParkingSpaceManager Not Found");
            }

            var managerDto = _mapper.Map<ParkingSpaceManagerDto>(manager);
            return Ok(managerDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateParkingSpaceManager([FromRoute] int id, [FromBody] ParkingSpaceManagerDto dto)
        {
            var manager = await _context.ParkingSpaceManagers.FirstOrDefaultAsync(q => q.Id == id);
            if (manager is null)
            {
                return NotFound("ParkingSpaceManager Not Found");
            }

            manager.Status = dto.Status;
            manager.Pagesa = dto.Pagesa;
            manager.Kontakti = dto.Kontakti;

            await _context.SaveChangesAsync();
            return Ok("ParkingSpaceManager Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteParkingSpaceManager([FromRoute] int id)
        {
            var manager = await _context.ParkingSpaceManagers.FirstOrDefaultAsync(q => q.Id == id);
            if (manager is null)
            {
                return NotFound("ParkingSpaceManager Not Found");
            }

            _context.ParkingSpaceManagers.Remove(manager);
            await _context.SaveChangesAsync();
            return Ok("ParkingSpaceManager Deleted Successfully");
        }
    }
}