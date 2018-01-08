using System.Web.Mvc;

namespace Applications.WeChat.Controllers
{
    /// <summary>
    /// 首页控制器
    /// </summary>
    public class ShoppingController : Controller
    {
        
        public ActionResult ShoppingCar()
        {
            return View();
        }


        public ActionResult ShoppingCarNull()
        {
            return View();
        }

        public ActionResult ShoppingPaymentSuccess()
        {
            return View();
        }

        public ActionResult ShoppingRechargeSuccess()
        {
            return View();
        }

    }
}
