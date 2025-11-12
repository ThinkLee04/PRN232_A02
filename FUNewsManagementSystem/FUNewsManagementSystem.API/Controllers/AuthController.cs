using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.DTOs;
using Service.Interfaces;

namespace FUNewsManagementSystem.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IJWTService _jwtService;
        public AuthController(IAccountService accountService, IJWTService jWTService)
        {
            _accountService = accountService;
            _jwtService = jWTService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<APIResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
        {
            try
            {
                var account = await _accountService.GetAccountByEmailAsync(request.Email, request.Password);
                if (account.Data == null)
                {
                    return Unauthorized(APIResponse<string>.Fail("Email or password is incorrect", "401"));
                }
                string token = _jwtService.GenerateToken(
                    account.Data.AccountId,
                    account.Data.AccountName,
                    account.Data.AccountEmail,
                    account.Data.AccountRole
                );
                LoginResponse response = new LoginResponse
                {
                    UserId = account.Data.AccountId,
                    UserName = account.Data.AccountName,
                    UserEmail = account.Data.AccountEmail,
                    Role = account.Data.AccountRole,
                    Token = token,
                };
                return Ok(APIResponse<LoginResponse>.Ok(response, "Login successfully"));
            }
            catch (Exception)
            {
                return StatusCode(500, APIResponse<string>.Fail("System error", "500"));
            }
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<APIResponse<ProfileResponse>>> GetProfile()
        {
            try
            {
                // Lấy thông tin từ token
                var accountIdClaim = User.FindFirst("AccountId")?.Value;
                if (string.IsNullOrEmpty(accountIdClaim))
                {
                    return Unauthorized(APIResponse<ProfileResponse>.Fail("Invalid token", "401"));
                }

                int accountId = int.Parse(accountIdClaim);
                var result = await _accountService.GetAccountByIdAsync(accountId);
                
                if (result.StatusCode == "404")
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, APIResponse<ProfileResponse>.Fail($"System error: {ex.Message}", "500"));
            }
        }
    }
}
