using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Category;
using backend_dotnet7.Core.Dtos.Ligjeruesi;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigjeruesiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public LigjeruesiController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD


        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateLigjeruesi([FromBody] LigjeruesiDto dto)
        {

            Ligjeruesi newLigjeruesi = _mapper.Map<Ligjeruesi>(dto);


            await _context.Ligjeruesit.AddAsync(newLigjeruesi);
            await _context.SaveChangesAsync();

            return Ok("LIgjeruesi Created Successfully");

        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<LigjeruesiDto>>> GetAllLigjeruesit()
        {
            var ligjeruesit = await _context.Ligjeruesit.ToListAsync();
            var convertedLigjeruesit = _mapper.Map<IEnumerable<Ligjeruesi>>(ligjeruesit);

            return Ok(convertedLigjeruesit);
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Ligjeruesi>> GetLigjeruesiById([FromRoute] int id)
        {
            var ligjeruesi = await _context.Ligjeruesit.FirstOrDefaultAsync(q => q.Id == id);

            if (ligjeruesi is null)
            {
                return NotFound("Ligjeruesit Not Found");
            }

            return Ok(ligjeruesi);
        }



        //Update

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateLigjeruesi([FromRoute] int id, [FromBody] LigjeruesiDto dto)
        {
            var ligjeruesi = await _context.Ligjeruesit.FirstOrDefaultAsync(q => q.Id == id);
            if (ligjeruesi is null)
            {
                return NotFound("Ligjerusi Not Found");
            }
            ligjeruesi.LecturerName = dto.LecturerName;
            ligjeruesi.Department=dto.Department;
            ligjeruesi.Email=dto.Email;

            await _context.SaveChangesAsync();
            return Ok("Ligjeruesi Updated Successfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteLigjeruesi([FromRoute] int id)
        {
            var ligjeruesi = await _context.Ligjeruesit.FirstOrDefaultAsync(q => q.Id == id);
            if (ligjeruesi is null)
            {
                return NotFound("Ligjeruesi Not Found");
            }
            _context.Ligjeruesit.Remove(ligjeruesi);
            await _context.SaveChangesAsync();
            return Ok("Ligjeruesi Deleted");
        }
    }
}
