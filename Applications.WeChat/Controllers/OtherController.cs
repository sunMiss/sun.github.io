using System.Web.Mvc;
using Applications.Services.Contracts.Systems;

namespace Applications.WeChat.Controllers
{
    /// <summary>
    /// 首页控制器
    /// </summary>
    public class OtherController : Controller
    {
           
        public ActionResult CityLine()
        {
            return View();
        }


        public ActionResult Login1()
        {
            return View();
        }

        public ActionResult NewlyIncreasedAddress()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }

        public ActionResult getCouponCenter()
        {
            return View();
        }

    }
}
