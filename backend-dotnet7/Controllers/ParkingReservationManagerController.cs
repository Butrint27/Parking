using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.ParkingReservationManager;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingReservationManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ParkingReservationManagerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateParkingReservationManager([FromBody] ParkingReservationManagerDTO dto)
        {
            var newManager = _mapper.Map<ParkingReservationManager>(dto);
            await _context.ParkingReservationManagers.AddAsync(newManager);
            await _context.SaveChangesAsync();
            return Ok("Parking Reservation Manager Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ParkingReservationManagerDTO>>> GetAllParkingReservationManagers()
        {
            var managers = await _context.ParkingReservationManagers.ToListAsync();
            var convertedManagers = _mapper.Map<IEnumerable<ParkingReservationManagerDTO>>(managers);
            return Ok(convertedManagers);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ParkingReservationManagerDTO>> GetParkingReservationManagerById([FromRoute] int id)
        {
            var manager = await _context.ParkingReservationManagers.FirstOrDefaultAsync(q => q.Id == id);
            if (manager is null)
            {
                return NotFound("Parking Reservation Manager Not Found");
            }
            var managerDto = _mapper.Map<ParkingReservationManagerDTO>(manager);
            return Ok(managerDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateParkingReservationManager([FromRoute] int id, [FromBody] ParkingReservationManagerDTO dto)
        {
            var manager = await _context.ParkingReservationManagers.FirstOrDefaultAsync(q => q.Id == id);
            if (manager is null)
            {
                return NotFound("Parking Reservation Manager Not Found");
            }

            manager.ManagerName = dto.ManagerName;
            manager.ManagerContact = dto.ManagerContact;

            await _context.SaveChangesAsync();
            return Ok("Parking Reservation Manager Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteParkingReservationManager([FromRoute] int id)
        {
            var manager = await _context.ParkingReservationManagers.FirstOrDefaultAsync(q => q.Id == id);
            if (manager is null)
            {
                return NotFound("Parking Reservation Manager Not Found");
            }
            _context.ParkingReservationManagers.Remove(manager);
            await _context.SaveChangesAsync();
            return Ok("Parking Reservation Manager Deleted");
        }
    }
}
