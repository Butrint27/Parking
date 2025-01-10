using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.UserProfile;
using backend_dotnet7.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserProfileController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD Operations for UserProfile

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateUserProfile([FromBody] UserProfileDto dto)
        {
            var newUserProfile = _mapper.Map<UserProfile>(dto);
            await _context.UserProfiles.AddAsync(newUserProfile);
            await _context.SaveChangesAsync();
            return Ok("UserProfile Created Successfully");
        }

        // Read all
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetAllUserProfiles()
        {
            var userProfiles = await _context.UserProfiles.Include(up => up.User).ToListAsync();
            var convertedProfiles = _mapper.Map<IEnumerable<UserProfileDto>>(userProfiles);
            return Ok(convertedProfiles);
        }

        // Read by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<UserProfileDto>> GetUserProfileById([FromRoute] int id)
        {
            var userProfile = await _context.UserProfiles.Include(up => up.User).FirstOrDefaultAsync(q => q.Id == id);
            if (userProfile is null)
            {
                return NotFound("UserProfile Not Found");
            }
            var userProfileDto = _mapper.Map<UserProfileDto>(userProfile);
            return Ok(userProfileDto);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUserProfile([FromRoute] int id, [FromBody] UserProfileDto dto)
        {
            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(q => q.Id == id);
            if (userProfile is null)
            {
                return NotFound("UserProfile Not Found");
            }

            userProfile.FirstName = dto.FirstName;
            userProfile.LastName = dto.LastName;
            userProfile.Address = dto.Address;
            userProfile.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();
            return Ok("UserProfile Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUserProfile([FromRoute] int id)
        {
            var userProfile = await _context.UserProfiles.FirstOrDefaultAsync(q => q.Id == id);
            if (userProfile is null)
            {
                return NotFound("UserProfile Not Found");
            }

            _context.UserProfiles.Remove(userProfile);
            await _context.SaveChangesAsync();
            return Ok("UserProfile Deleted Successfully");
        }
    }
}
