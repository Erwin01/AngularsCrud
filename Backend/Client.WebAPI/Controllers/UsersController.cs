using Client.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Client.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly AngularjsDbContext _context;


        public UsersController(AngularjsDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, users);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userById = await _context.Users.FindAsync(id);
            return StatusCode(StatusCodes.Status200OK, userById);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, user);
        }


        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, user);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) 
        {

            var userById = await _context.Users.FindAsync(id);

            if (userById == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userById);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status204NoContent);
        }
    }
}
