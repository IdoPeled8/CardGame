using card_game_server.Models;
using Microsoft.AspNetCore.Mvc;

namespace card_game_server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Authorization : ControllerBase
    {

        //    public async Task<IActionResult> Register(User model)
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            var user = await _userLogic.MakeNewUserAsync(model);

        //            if (user)
        //            {
        //                TempData["RegisterSucceeded"] = UiMessages.RegisterSucceeded;
        //                return RedirectToAction("Login");
        //            }
        //        }
        //        return View(model);
        //    }
        //}
    }
}
