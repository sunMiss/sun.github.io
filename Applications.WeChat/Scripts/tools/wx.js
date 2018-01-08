if (!$wy) var $wy = {};
//APPId
$wy.appId = "wx268ecf589eb47c68";
var _token;
var userInfo;
var num = 0;
$wy.wx = {
    "getUserInfo": function (code, callback) {
        $.get(Common.API_BASE_URL + 'api/User/WebWeChatAuthorization?code=' + code, function (response) {
            //alert(JSON.stringify(response))
            if (response.status == 1) {
                $wy.addSession({
                    name: 'token',
                    info: response.data.accessToken
                });
                window._token = response.data.accessToken;
                var userInfo = {
                    userName: response.data.userName,
                    nickName: response.data.nickName

                }

                window.userInfo = userInfo;
				
                $wy.addStorage({
                    name: 'userInfo',
                    info: userInfo
                });
                
                $wy.addStorage({
                    name: 'token',
                    info: window._token
                });
                //$wy.userInfoed();
                callback();
                //location.reload();
            } else if (response.status == -1) {
                callback();
            } else {
                //var url = encodeURIComponent(window.location.href)
                //location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $wy.appId + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=11#wechat_redirect";
                location.href = "http://www.dangxiapin.com/get-weixin-code.html?appid=" + $wy.appId + "&scope=snsapi_userinfo&state=11&redirect_uri=" + window.location.href;
            }

        }, 'json')
    },
    "indexGetToken": function (callback) {
        var code = $wy.getUrlParams(location.href).code;
        if (code) {
            $wy.wx.getUserInfo(code, callback);
        } else {
            //location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $wy.appId + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=12#wechat_redirect";
            location.href = "http://www.dangxiapin.com/get-weixin-code.html?appid=" + $wy.appId + "&scope=snsapi_userinfo&state=11&redirect_uri=" + window.location.href;
        }
    },
    "haveToken": function (callback) {
        var storageToken = $wy.getStorage('token');
        if (window._token && window._token != 'false') {
            //授权成功过
            $wy.addSession({
                "name": "token",
                "info": _token
            })
            callback();
        } else if (storageToken && storageToken != 'false') {
            //历史授权成功过
            $wy.addSession({
                "name": "token",
                "info": storageToken
            })
            callback();
        } else {
            var token = $wy.getSession('token');
            var userInfo = $wy.getStorage('userInfo');
            if (token && token != 'false' && userInfo && userInfo != 'false') {
                window._token = token;
                userInfo = userInfo ? userInfo : {};
                window.userInfo = userInfo;
                console.log("已经授权过");
                callback();
            } else {
                console.log("未授权过");
                $wy.wx.indexGetToken(callback);       
            }
        }
    }
}

$wy.getUrlParams = function (url) {
    var args = {};
    url = url || location.href;
    try {
        var pairs = url.split("?")[1].split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].split('=');
            if (pos.length == 1) {
                continue;
            }
            args[pos[0]] = decodeURIComponent(pos[1]);
        }
    } catch (e) {
    }
    return args;
};

//写入session缓存 时间以秒计算
$wy.addSession = function (obj) {
    var msg = {
        info: obj.info,
        time: new Date().getTime(),
        livetime: obj.time
    };
    sessionStorage[obj.name] = JSON.stringify(msg);
}

//取session缓存
$wy.getSession = function (name) {
    if (typeof (sessionStorage[name]) == 'undefined' || sessionStorage[name] === null || sessionStorage[name] === 'null') {
        return null;
    } else {
        msg = JSON.parse(sessionStorage[name]);
        if (!msg.info || msg.info === null || msg.info.length === 0) return null;
    }
    if (msg.livetime) {
        if (msg.time + msg.livetime * 1000 < new Date().getTime()) return null;
    }
    return msg.info;
}
//写入Cookie缓存 时间以秒计算
$wy.addStorage = function (obj) {
    //如果不规定生命周期 默认一年
    if (!obj.livetime) {
        obj.livetime = 60 * 60 * 24 * 365;
    }
    var msg = {
        info: obj.info,
        time: new Date().getTime(),
        livetime: obj.time
    };
    localStorage[obj.name] = JSON.stringify(msg);
}
//取Cookie缓存
$wy.getStorage = function (name) {
    var msg = null;
    if (typeof (localStorage[name]) == 'undefined' || localStorage[name] === null || localStorage[name] == 'null') {
        return null;
    } else {
        msg = JSON.parse(localStorage[name]);
        if (!msg.info || msg.info === null || msg.info.length === 0) return null;
    }
    if (msg.time + msg.livetime * 1000 < new Date().getTime()) return null;
    return msg.info;
}


$(function () {
    is_weixn();
    var params = $wy.getUrlParams(window.location.href);
    if (params.r == "1") {
        $wy.addSession({
            name: 'isStore',
            info: "1"
        });
    }
    if (params.storeId) {
        $wy.addSession({
            name: 'StoreId',
            info: params.storeId
        });
    }
});
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        $wy.wx.haveToken(function () {

        });
    } else {
        console.log("非微信");
        return false;
    }
}

///*用户信息*/
//$wy.userInfoed = function () {
//    //var par = { code: token };
//    var token = JSON.parse(localStorage.getItem("token")).info;
//    var objHeader = { "Authorization":'Bearer '+token };
//    $.ajax({
//        url: Common.API_BASE_URL + Common.API_URL_GET_USER_INFO,
//        type: "GET",
//        headers: objHeader,
//        //data: par,
//        dataType: "json",
//        success: function (res) {
//            //console.log(res);
//            if (res.status == Common.HTTP_VALUE_SUCCESS) {
//                var data = res.data;
//                var openid = data.openid;
//                $.ajax({
//                	type:"get",
//                	dataType: "jsonp",
//                	url:"http://192.168.30.134/mobile/user.php?openid="+openid,
//                	success:function(data){
//                		//console.log(data)
//                	}
//                });
//            }
//        }
//    })
//}


var token = localStorage.getItem("token");
var tokenObj = token ? JSON.parse(token).info : null;
