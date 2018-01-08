/**
 * 公共资源库
 */
var Common = {
    /*获取url中的参数*/
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}


if (!$wy) var $wy = {};
$wy.getHost = function () {
    var url = window.location.href;
    var i = url.indexOf("/system");
    var host = url.substr(0, i + 9);
    //host = 'http://192.168.30.134:8083/'
    host = 'http://39.108.113.43:83/'
    return host;
}


// $wy.appId = "wx268ecf589eb47c68";

//$wy.appId = "wx8ba94727121b5eb2";
$wy.appId = "wx268ecf589eb47c68";
/*
 *
 * {"data":
 * {"userName":"胡洁",
 * "avatar":"http://wx.qlogo.cn/mmopen/vi_32/sHPrgfrTWlVJFtAYVSmzmQHRJQAsnNlUP4CbibtxVIswfJxhAdzzrgyNUzoqVia0fvoZQ0enw6yoWp1QTstPxIZQ/0",
 * "nickName":"胡洁",
 * "accessToken":"kaIai_9WzUmUELe_b3AcQG6FVdNqe6zbgtSWhSyge1knxQv21X95QWrHild85BxPoEfYbGx6DjlJXANyKq3AhYQ8OBILp2MnlkvuKLtU5TccceYP3rD3aJDslQm0529Lv1LSrbjKTC5GFmM2o4GxV1IsxIu9ZAwF0I-1xtgHzwTcmz75vfdr5z5ytwUTlxOkzKvrYE9lkReX-Io0FA1qr13jgr1BDggK6f1SapcVrQn1_6FWqsqRT8Src2K7zrE682ir6nHfRC7kfufXFA4V59GEtiMgb_qiCov1B9r5l1YAPW1VDxYFhHPLX3-VXgE5xGVJ8VLcwLQx1KxcL-F3LPiUJLw_s5kZYazAYm-kBy8fJFe5cGM_TNpZjwF9fOoaIOT1mMdlOOvTzmDZ",
 * "tokenType":"Bearer",
 * "expiresIn":1296000,
 * "issued":1506448825000,
 * "expires":1507744825000},
 * "status":1,"message":"请求成功！",
 * "errors":null,"url":null}
 * {"data":{"userName":"胡洁","avatar":"http://wx.qlogo.cn/mmopen/vi_32/sHPrgfrTWlVJFtAYVSmzmQHRJQAsnNlUP4CbibtxVIswfJxhAdzzrgyNUzoqVia0fvoZQ0enw6yoWp1QTstPxIZQ/0","nickName":"胡洁","accessToken":"FSMuqEIe9ojeViyajgPlbg42oEQ44C8szfTOhE4owvYITS88ohGMPpdkldLCkMA56ePcMm9Px7CO3SLVt3wc7PLfpJILofcKu62i5_qbMHay17kIi6gnqsgHQ4u2aAtFlATkc4rk1ee53hnrZnHjE1HLS_vW4ETMmbgvlU-AnkWHIKVhSO2-AK4Iz3GP-j9gdDHqIzKSKtevfxVXn6XGWiOyw6h5yj8fOmMfnyfuvlTibAy-Y8sWstgWWj2vnoES1niaWPfHqnjLB2xBdk5U70swyoeMrzINGJgkLMoUXuolUwwqDXGWOFtisxGBJO8NxzanhCBI6oiaakgTcvMXkAPGBM6y38beQ7tPsOH8yDcMC0sNpMduFwnIdA2HMQkJwoRY2k00eb1wt_xo","tokenType":"Bearer","expiresIn":1296000,"issued":1506472888000,"expires":1507768888000},"status":1,"message":"请求成功！","errors":null,"url":null}
 *
 * */


var _token;
var userInfo;

$wy.wx = {
    "getUserInfo": function (code, callback) {
        $.get($wy.getHost() + 'api/User/WebWeChatAuthorization?code=' + code, function (response) {
            if (response.status == 1) {
                $wy.addSession({
                    name: 'token',
                    info: response.data.accessToken
                });
                window._token = response.data.accessToken;
                var userInfo = {
                    nickName: response.data.nickName,
                    sex: response.data.Sex,
                    phoneNumber: response.Data.PhoneNumber
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
                callback();
            } else if (response.status == -1) {
                callback();
            } else {
                //var url = encodeURIComponent(window.location.href)
                var url = encodeURIComponent("http://www.dangxiapin.com/Home/Index");
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $wy.appId + "&redirect_uri=" +
                    url + "&response_type=code&scope=snsapi_userinfo&state=11#wechat_redirect";
            }

        }, 'json')
    },
    "indexGetToken": function (callback) {
        //var code = $wy.getUrlParams(location.href)['code'];
        // var code = $wy.getUrlParams("http://www.dangxiapin.com")['code'];
        var code = $wy.getUrlParams("http://www.dangxiapin.com/Home/Index")['code'];
        if (code) {
            //if(configFn.noConfig===true)
            console.log("已经拿到了code");
            $wy.wx.getUserInfo(code, callback);

        } else {
            console.log("去拿code");
            var url = encodeURIComponent("http://test.dangxiapin.com/test.php");
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + $wy.appId + "&redirect_uri=" +
                url + "&response_type=code&scope=snsapi_userinfo&state=12#wechat_redirect";

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
                console.log("已经授权过")
                callback();
            } else {
                console.log("未授权过")
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
    if (typeof(sessionStorage[name]) == 'undefined' || sessionStorage[name] === null || sessionStorage[name] === 'null') {
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
    if (typeof(localStorage[name]) == 'undefined' || localStorage[name] === null || localStorage[name] == 'null') {
        return null;
    } else {
        msg = JSON.parse(localStorage[name]);
        if (!msg.info || msg.info === null || msg.info.length === 0) return null;
    }
    if (msg.time + msg.livetime * 1000 < new Date().getTime()) return null;
    return msg.info;
}


