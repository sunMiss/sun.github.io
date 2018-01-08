using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System.Web.Mvc
{
    public static class MyUrlHelper
    {
        public static string Scrpit(this UrlHelper helper, string value)
        {
            string jsCssVersion = ConfigurationManager.AppSettings["Js_CSS_Version"];
            if (string.IsNullOrEmpty(jsCssVersion))
            {
                return helper.Content(value);
            }
            else
            {
                return helper.Content(string.Format(value + "?v={0}", jsCssVersion));
            }

        }
    }
}