
/**
 * Ajax请求
 * @param {} options
 * @returns {}
 */
$.AjaxRequest = function (options) {
    var defaults = {
        msg: "数据加载中...",
        url: "",
        param: {},
        type: "post",
        dataType: "json",
        async: true,
        success: null
    };
    var options = $.extend(defaults, options);
    var postdata = options.param;

    $.ajax({
        url: options.url,
        data: postdata,
        type: options.type,
        dataType: options.dataType,
        async: options.async,
        success: function (data) {
            options.success(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //Loading(false);

            // layer.closeAll('loading');
            // dialogMsg(errorThrown, -1);
        },
        beforeSend: function () {
            //Loading(true, options.msg);
            // layer.msg(options.msg, {
            //     icon: 16,
            //     shade: 0.01
            // });
        },
        complete: function () {
            //Loading(false);
            //layer.closeAll('loading');
        }
    });
};



