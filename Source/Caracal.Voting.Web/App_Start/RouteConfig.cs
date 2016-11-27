using System.Web.Mvc;
using System.Web.Routing;

namespace Caracal.Voting.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               "Dashboard",
               "dashboard",
               new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );

            routes.MapRoute(
               "VoteController",
               "vote-controller",
               new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional}
            );
        }
    }
}