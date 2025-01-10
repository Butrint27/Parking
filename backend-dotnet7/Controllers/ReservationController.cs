using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Reservation;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public ReservationController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationDTO dto)
        {
            var newReservation = _mapper.Map<Reservation>(dto);
            await _context.Reservations.AddAsync(newReservation);
            await _context.SaveChangesAsync();
            return Ok("Reservation Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<ReservationDTO>>> GetAllReservations()
        {
            var reservations = await _context.Reservations.Include(r => r.ParkingSpot).Include(r => r.ParkingReservationManager).ToListAsync();
            var convertedReservations = _mapper.Map<IEnumerable<ReservationDTO>>(reservations);
            return Ok(convertedReservations);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Reservation>> GetReservationById([FromRoute] int id)
        {
            var reservation = await _context.Reservations.Include(r => r.ParkingSpot).Include(r => r.ParkingReservationManager).FirstOrDefaultAsync(q => q.Id == id);
            if (reservation is null)
            {
                return NotFound("Reservation Not Found");
            }
            return Ok(reservation);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateReservation([FromRoute] int id, [FromBody] ReservationDTO dto)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(q => q.Id == id);
            if (reservation is null)
            {
                return NotFound("Reservation Not Found");
            }

           
            reservation.StartDate = dto.StartDate;
            reservation.EndDate = dto.EndDate;
            reservation.Status = dto.Status;
            reservation.TotalAmount = dto.TotalAmount;
            reservation.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok("Reservation Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteReservation([FromRoute] int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(q => q.Id == id);
            if (reservation is null)
            {
                return NotFound("Reservation Not Found");
            }
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return Ok("Reservation Deleted");
        }
    }
}
