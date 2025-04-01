using app_backend.Models;
using Microsoft.AspNetCore.Mvc;
using app_backend.Services;
using System;

namespace app_backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ILogger<UsersController> _logger;

        public UsersController(UserService userService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersAsync()
        {
            try
            {
                var users = await _userService.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting users.");
                return Problem(detail: ex.Message, statusCode: 500, title: "Error fetching the users");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound(new { Message = $"User with ID {id} not found." });
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting user by ID.");
                return Problem(detail: ex.Message, statusCode: 500, title: "Error fetching the user");
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUserAsync([FromBody] User user)
        {
            _logger.LogInformation("Received POST request to add user: {@User}", user);

            try
            {
                if (user == null)
                {
                    _logger.LogError("User object is null");
                    return Problem(detail: "User object is null", statusCode: 400, title: "Invalid User");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid user object: {Errors}", ModelState);
                    return ValidationProblem(ModelState);
                }

                _logger.LogInformation("Creating User: {@User}", user);
                var newUser = await _userService.AddUserAsync(user);
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding a new user.");
                return Problem(detail: ex.Message, statusCode: 500, title: "Error adding the user");
            }
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUserAsync([FromBody] User user)
        {
            try
            {
                if (user == null)
                {
                    _logger.LogError("User object is null");
                    return Problem(detail: "User object is null", statusCode: 400, title: "Invalid User");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Invalid user object: {Errors}", ModelState);
                    return ValidationProblem(ModelState);
                }

                var updatedUser = await _userService.UpdateUserAsync(user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating the user.");
                return Problem(detail: ex.Message, statusCode: 500, title: "Error updating the user");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUserAsync(int id)
        {
            _logger.LogInformation("Received DELETE request for user with ID: {Id}", id);

            try
            {
                var result = await _userService.DeleteUserAsync(id);
                if (!result)
                {
                    _logger.LogWarning("User with ID {Id} not found.", id);
                    return NotFound(new { Message = $"User with ID {id} not found." });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting the user with ID {Id}.", id);
                return Problem(detail: ex.Message, statusCode: 500, title: "Error deleting the user");
            }
        }
    }
}
