using System.Security.Claims;

namespace Service.Interfaces
{
    public interface IJWTService
    {
        string GenerateToken(int id, string name, string email, int role);
        ClaimsPrincipal ValidateToken(string token);
        string GenerateRefreshToken();
    }
}
