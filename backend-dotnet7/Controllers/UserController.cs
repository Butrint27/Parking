using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.User;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto dto)
        {
            var newUser = _mapper.Map<User>(dto);
            await _context.User.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok("User Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _context.User.Include(u => u.UserProfile).ToListAsync();
            var convertedUsers = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(convertedUsers);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById([FromRoute] int id)
        {
            var user = await _context.User.Include(u => u.UserProfile).FirstOrDefaultAsync(q => q.Id == id);
            if (user is null)
            {
                return NotFound("User Not Found");
            }
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UserDto dto)
        {
            var user = await _context.User.FirstOrDefaultAsync(q => q.Id == id);
            if (user is null)
            {
                return NotFound("User Not Found");
            }

            user.Username = dto.Username;
            user.Email = dto.Email;
        

            // If user profile exists and needs to be updated
            if (dto.UserProfile != null)
            {
                user.UserProfile.FirstName = dto.UserProfile.FirstName;
                user.UserProfile.LastName = dto.UserProfile.LastName;
                user.UserProfile.Address = dto.UserProfile.Address;
            }

            await _context.SaveChangesAsync();
            return Ok("User Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var user = await _context.User.FirstOrDefaultAsync(q => q.Id == id);
            if (user is null)
            {
                return NotFound("User Not Found");
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User Deleted Successfully");
        }
    }
}
