namespace Applications.WeChat.Models
{
    /// <summary>
    /// 手机应用返回结果
    /// </summary>
    public class AppResult
    {
        /// <summary>
        /// 状态
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 用户编号
        /// </summary>
        public string UserId { get; set; }

    }
}