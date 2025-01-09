using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Category;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public CategoryController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD


        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto dto)
        {

            Category newCategory = _mapper.Map<Category>(dto);


            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return Ok("Category Created Successfully");

        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            var convertedCategories = _mapper.Map<IEnumerable<Category>>(categories);

            return Ok(convertedCategories);
        }

        [HttpGet]
        [Route("{id}")]

        public async Task<ActionResult<Category>> GetCategoryById([FromRoute] int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);

            if (category is null)
            {
                return NotFound("Categories Not Found");
            }

            return Ok(category);
        }



        //Update

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] CategoryDto dto)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);
            if (category is null)
            {
                return NotFound("Category Not Found");
            }
            category.Name= dto.Name;
            category.Description= dto.Description;


            await _context.SaveChangesAsync();
            return Ok("Category Updated Successfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(q => q.Id == id);
            if (category is null)
            {
                return NotFound("Category Not Found");
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Category Deleted");
        }
    }
}
