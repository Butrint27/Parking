﻿using backend_dotnet7.Core.Constants;
using backend_dotnet7.Core.Dtos.Auth;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("seed-roles")]
        public async Task <IActionResult> SeedRoles()
        {
            var seedResult=await _authService.SeedRolesAsync();
            return StatusCode(seedResult.StatusCode, seedResult.Message);
        }

        [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult=await _authService.RegisterAsync(registerDto);
            return StatusCode(registerResult.StatusCode, registerResult.Message);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);
            if(loginResult is null)
            {
                return Unauthorized("Your crendetials are invalid.Please contact to an Admin");
            }
            return Ok(loginResult);
        }

        [HttpPost]
        [Route("upate-role")]
        [Authorize(Roles =StaticUserRoles.OwnerAdmin)]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await _authService.UpdateRoleAsync(User, updateRoleDto);

            if(updateRoleResult.IsSucceed)
            {
                return Ok(updateRoleResult.Message);
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode, updateRoleResult.Message);   
            }
        }

        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody]MeDto token)
        {
            try
            {
                var me = await _authService.MeAsync(token);
                if(me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("InvalidToken");
                }
            }catch(Exception)
            {
                return Unauthorized("Invalid Token");
            }
        }

        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserInfoResult>>> GetUsersList()
        {
            var usersList=await _authService.GetUsersListAsync();
            return Ok(usersList);
        }

        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserInfoResult>> GetUserDetailsByUserName([FromRoute] string userName)
        {
            var user=await _authService.GetUserDetailsByUserNameAsync(userName);
            if(user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("UserName not found");
            }
        }

        [HttpGet]
        [Route("usernames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUserNamesList()
        {
            var usernames= await _authService.GetUsernameListAsync();
            return Ok(usernames);
        }

    }
}