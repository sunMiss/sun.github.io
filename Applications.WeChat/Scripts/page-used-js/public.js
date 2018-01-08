//var param = {
//	url:
//}

//$.ajax({
//    url: Common.API_BASE_URL + Common.API_URL_GET_SHARE_INFO+'=',
//    dataType: "json",
//    contentType: "text/json",
//    type: "POST",
//    data: JSON.stringify(param),
//    success: function (res) {
//		console.log(res)
//    },
//    error: function(){
//    	console.log('数据请求失败')
//        }
//   })














//wx.config({
//    debug: false,
//    appId: 'wx268ecf589eb47c68',  		// 必填，公众号的唯一标识
//    timestamp: 2154156131115,	// 必填，生成签名的时间戳
//    nonceStr: 'dsfewfesfds',   // 必填，生成签名的随机串
//    signature: 'dsfsdfs', // 必填，签名
//    jsApiList: [                // 必填，需要使用的JS接口列表
//        'checkJsApi',
//        'onMenuShareTimeline'
//    ]
//});
////var shareTitle = "更多优惠，尽在聚惠";
////var shareDesc = "大回馈，花少钱享优质生活，更多优惠商品，就等你喊朋友一起来选！";
////var currentLink = window.location.href;
////var shareLink = currentLink <#if u??> + (currentLink.indexOf("?") > -1 ? ("&u=" + "${u!}" + "&t=" + "${t!}" + "&o=" + "${o!}" + "&s=" + "${s!}") : ("?u=" + "${u!}" + "&t=" + "${t!}" + "&o=" + "${o!}" + "&s=" + "${s!}"))</#if>;
////  shareLink = shareLink <#if !city??> + (shareLink.indexOf("?") > -1 ? ("&city=" + "深圳") : ("?city=" + "深圳"))</#if>;
////var shareImgUrl = "${IMGPATH!}/images/banner2.png";
////var shareGid = "";


//wx.ready(function(){
//    // 分享到朋友圈设置
//    wx.onMenuShareTimeline({
//        title: '测试标题', // 分享标题
//        link: 'http://www.baidu.com', // 分享链接
//        imgUrl: 'http://mp.weixin.qq.com/wiki/static/assets/dc5de672083b2ec495408b00b96c9aab.png', // 分享图标
//        success: function () { 
//            alert("分享成功");
//        },
//        cancel: function () { 
//            alert("分享失败");
//        }
//    });
//    // 分享给好友
//    wx.onMenuShareAppMessage({
//        title: '测试标题', // 分享标题
//        desc: '测试分享描述', // 分享描述
//        link: 'http://www.baidu.com', // 分享链接
//        imgUrl: 'http://mp.weixin.qq.com/wiki/static/assets/dc5de672083b2ec495408b00b96c9aab.png', // 分享图标
//        type: '', // 分享类型,music、video或link，不填默认为link
//        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//        success: function () { 
//            alert("分享成功");
//        },
//        cancel: function () { 
//            alert("分享失败");
//        }
//    });
//})





