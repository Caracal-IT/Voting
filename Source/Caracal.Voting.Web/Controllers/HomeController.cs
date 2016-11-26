using System.Web.Mvc;

namespace Caracal.Voting.Web.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }
    }
}