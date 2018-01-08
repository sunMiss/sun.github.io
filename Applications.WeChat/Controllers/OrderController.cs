using System.Web.Mvc;
using Applications.Services.Contracts.Systems;
using System.Collections.Generic;

namespace Applications.WeChat.Controllers
{
    /// <summary>
    /// 首页控制器
    /// </summary>
    public class OrderController : Controller
    {
        public ActionResult PlaceOrder()
        {
            return View();
        }

        public ActionResult ObligationOrderForm()
        {
            return View();
        }

        public ActionResult AddAddress()
        {
            return View();
        }

        public ActionResult FoundAddress()
        {
            return View();
        }


        public ActionResult OrderConfirm()
        {
            return View();
        }

        public ActionResult OrderDetails()
        {
            return View();
        }

        public ActionResult OrderPayWay()
        {
            return View();
        }
        public ActionResult PendingShipment()
        {
            return View();
        }


        public ActionResult OrderOarticulars()
        {
            return View();
        }

        public ActionResult LogisticsInfo()
        {
            return View();
        }

        public ActionResult LogisticsList()
        {
            return View();
        }

        public ActionResult PhpOrderList()
        {
            return View();
        }
    }
}
