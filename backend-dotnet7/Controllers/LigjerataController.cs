using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Ligjerata;
using backend_dotnet7.Core.Dtos.Product;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigjerataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public LigjerataController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD


        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateLigjerata([FromBody] LigjerataDto dto)
        {

            Ligjerata newLigjerata = _mapper.Map<Ligjerata>(dto);


            await _context.Ligjeratat.AddAsync(newLigjerata);
            await _context.SaveChangesAsync();

            return Ok("Ligjerata Created Successfully");

        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<LigjerataDto>>> GetAllLigjeratat()
        {
            var ligjeratat = await _context.Ligjeratat.ToListAsync();
            var convertedLigjeratat= _mapper.Map<IEnumerable<LigjerataDto>>(ligjeratat);

            return Ok(convertedLigjeratat);
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Ligjerata>> GetLigjerataById([FromRoute] int id)
        {
            var ligjerata = await _context.Ligjeratat.FirstOrDefaultAsync(q => q.Id == id);

            if (ligjerata is null)
            {
                return NotFound("Ligjerata Not Found");
            }

            return Ok(ligjerata);
        }

        //Update

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateLigjerata([FromRoute] int id, [FromBody] LigjerataDto dto)
        {
            var ligjerata = await _context.Ligjeratat.FirstOrDefaultAsync(q => q.Id == id);
            if (ligjerata is null)
            {
                return NotFound("Ligjerata Not Found");
            }
            ligjerata.LectureName = dto.LectureName;

            await _context.SaveChangesAsync();
            return Ok("Ligjerata Updated Successfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteLigjerata([FromRoute] int id)
        {
            var ligjerata = await _context.Ligjeratat.FirstOrDefaultAsync(q => q.Id == id);
            if (ligjerata is null)
            {
                return NotFound("Ligjerata Not Found");
            }
            _context.Ligjeratat.Remove(ligjerata);
            await _context.SaveChangesAsync();
            return Ok("Ligjerata Deleted");
        }
    }
}
