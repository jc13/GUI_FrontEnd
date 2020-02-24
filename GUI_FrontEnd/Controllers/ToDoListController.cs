using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GUI_FrontEnd.Controllers
{
    public class ToDoListController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}