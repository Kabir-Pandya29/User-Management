using app_backend.Data;
using app_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace app_backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(ApplicationDbContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            try
            {
                return await _context.User.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UserRepository.GetUsersAsync()");
                throw;
            }
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                return await _context.User.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UserRepository.GetUserByIdAsync()");
                throw;
            }
        }

        public async Task<User> AddUserAsync(User user)
        {
            try
            {
                await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UserRepository.AddUserAsync()");
                throw;
            }
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                var user = await _context.User.FindAsync(id);
                if (user == null)
                {
                    return false;
                }
                _context.User.Remove(user);
                await _context.SaveChangesAsync();
                Console.WriteLine("User deleted: ", user);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UserRepository.DeleteUserAsync()");
                return false;
            }
        }


        public async Task<User> UpdateUserAsync(User user)
        {
            try
            {
                if (user == null || user.Id == null)
                {
                    _logger.LogError("User object or User ID is null");
                    throw new ArgumentException("User object or User ID is null");
                }

                var existingUser = await _context.User.FindAsync(user.Id);
                if (existingUser == null)
                {
                    _logger.LogError($"User with ID {user.Id} not found");
                    throw new KeyNotFoundException($"User with ID {user.Id} not found");
                }

                _context.Entry(existingUser).CurrentValues.SetValues(user);
                await _context.SaveChangesAsync();
                return existingUser;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UserRepository.UpdateUserAsync()");
                throw;
            }
        }


    }
}
