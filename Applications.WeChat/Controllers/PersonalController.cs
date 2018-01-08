using System.Web.Mvc;
using Applications.Services.Contracts.Systems;

namespace Applications.WeChat.Controllers
{
    /// <summary>
    /// 首页控制器
    /// </summary>
    public class PersonalController : Controller
    {
        
        public ActionResult Personal()
        {
            return View();
        }


        public ActionResult PersonalLogisticsDetails()
        {
            return View();
        }

        public ActionResult Balance()
        {
            return View();
        }

        public ActionResult Withdrawals()
        {
            return View();
        }

        public ActionResult Recharge()
        {
            return View();
        }

        public ActionResult Detailed()
        {
            return View();
        }

        public ActionResult StoreUserAdmin()
        {
            return View();
        }

        public ActionResult wxChatLogin() {
            return View();
        }

        public ActionResult LogOut() {
            return View();
        }

        public ActionResult Coupon()
        {
            return View();
        }

    }
}
