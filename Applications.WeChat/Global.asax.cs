using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Applications.Datas;
using Applications.Services.Configs;
using Util.Datas.Ef;
using Util.Iocs;
using Util.Logs;

namespace Applications.WeChat
{
    /// <summary>
    /// 应用程序全局设置
    /// </summary>
    public class MvcApplication : HttpApplication {
        /// <summary>
        /// 启动应用程序
        /// </summary>
        protected void Application_Start() {
            WriteLog( "Application_Start准备启动" );
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters( GlobalFilters.Filters );
            RouteConfig.RegisterRoutes( RouteTable.Routes );
            BundleConfig.RegisterBundles( BundleTable.Bundles );
            //Ioc.RegisterMvc( typeof( MvcApplication ).Assembly, new IocConfig() );
            //UnitOfWork.Init( new ApplicationUnitOfWork() );
            WriteLog( "Application_Start启动完成" );
        }

        /// <summary>
        /// 应用程序错误处理
        /// </summary>
        protected void Application_Error( object sender, EventArgs e ) {
            var lastError = Server.GetLastError();
            WriteLog( lastError );
            //Response.Redirect( @"~/error" );
            //Server.ClearError();
        }

        /// <summary>
        /// 记录日志
        /// </summary>
        private void WriteLog( string caption ) {
            Log.GetLog().Debug( caption );
        }

        /// <summary>
        /// 记录异常日志
        /// </summary>
        private void WriteLog( Exception exception ) {
            Log.GetLog().Caption( "Global全局异常捕获" ).Exception( exception ).Error();
        }
    }
}
