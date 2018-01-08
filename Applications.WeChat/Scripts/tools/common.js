/**
 * 公共资源库
 */
var Common = {
    //api服务器地址
    API_BASE_URL: is_debug == 0 ? "http://api.dangxiapin.com/" : "http://testapi.dangxiapin.com/",

    //获取首页banner图数据
    API_URL_GET_BANNER: "api/HomePage/GetBanner",

    //获取首页活动信息
    API_URL_GET_ACTIVITY: "api/HomePage/GetActivityies",

    //获取首页热门专题数据
    API_URL_GET_HOT_TOPIC: "api/HomePage/GetHotTopic",

    //获取首页商品分类数据
    API_URL_GET_GOODS: "api/HomePage/GetCategoryGoods",

    //获取首页全部商品 懒加载
    API_URL_GET_ALL_GOODS: "api/HomePage/GetGoodsByPage",

    //通过商品id获取商品详情页api/Goods/GetGoodsDetail?goodsId={goodsId}
    API_URL_GET_GOODS_DETAILS: "api/Goods/GetGoodsDetail",

    //获取分类中商品分类
    API_URL_GET_GOODS_CATEGORY: "api/Goods/GetGoodsCategory",

    //获取首页分类中商品分类
    API_URL_GET_HOMEPAGE_CATEGORY: "api/HomePage/GetHomeCategory",

    //获取店铺商品分类
    API_URL_GET_GOODS_STORE_CATEGORY: "api/Goods/GetGoodsAllCategory",

    //通过父级ID获取商品分类详情页api/Goods/GetGoodsCategoryByParentId
    API_URL_GET_GET_GOODS_CATEGORY_BY_ID: "api/Goods/GetGoodsCategoryByParentId",

    //根据店铺搜索商品
    API_URL_GET_GET_GOODS_SEARCH_BY_STORE: "api/HomePage/SearchGoodsProductsByStore",

    //获取分店信息(店铺)
    API_URL_POST_GET_GBRANCH: "api/HomePage/GetBranch",

    //通过分类获取商品信息
    API_URL_GET_GET_GOODS_BY_STORE: "api/Goods/GetGoodsByCategory",

    //通过分类获取商品信息
    API_URL_GET_GETHOME_GOODS_BY_CATEGORY: "api/HomePage/GetHomeGoodsByCategory",

    //服务器请求成功值
    HTTP_VALUE_SUCCESS: 1,

    //COOKIE banner图存于客户端
    COOKIE_KEY_BANNER_LIST: "DXP_COOKIE_BANNER_LIST",

    //添加收货地址信息
    API_URL_POST_USER_ADD_SHOPPING_ADDRESS: "api/User/AddShippingAddress",

    //获取区域信息
    API_URL_POST_USER_GET_AREA_LIST: "api/User/GetAreaList",

    //获取收货地址
    API_URL_GET_USER_GET_ADDRESS_LIST: "api/User/GetAddressList",

    //修改收货地址信息
    API_URL_POST_USER_GET_UPDATE_ADRESS: "api/User/UpdateShippingAddress",


    //获取收货地址--编辑
    API_URL_POST_USER_GET_SHIPPING_ADRESSID: "api/User/GetAddressById?ShippingAddressId",


    //删除收货地址
    API_URL_POST_USER_GET_DEL_ADDRESS: "api/User/DeleteAddress",

    //设置默认地址
    API_URL_POST_USER_SET_ADDRESS: "api/User/SetDefaultAddress",


    //添加到购物车
    API_URL_POST_ADD_SHOPPING_CAR: "api/ShoppingCart/AddShoppingCart",

    //立即购买--商品详情
    API_URL_POST_ADD_PREVIEW_ORDER: "api/Sales/PreviewOrder",

    //添加收藏商品
    API_URL_POST_BUY_NOW: "api/Goods/AddGoodsCollect",



    //查看购物车api/ShoppingCart/GetShoppingCart
    API_URL_GET_SHOPPINGCAR: "api/ShoppingCart/GetShoppingCart",

    //加入购物车
    API_JOINTYPE_SHOPPING_CART: 0,

    //立即购买
    API_JOINTYPE_BUYNOW: 1,

    //删除购物车
    API_URL_POST_DELETESHOPPING_CARTS: "api/ShoppingCart/DeleteShoppingCart",

    //更新购物车 api/ShoppingCart/UpdateShoppingCart
    API_URL_POST_UPDATECART: "api/ShoppingCart/UpdateShoppingCart",

    //获取购物车数量
    API_URL_GET_SHOPPINGCART_SUM: "api/ShoppingCart/GetShoppingCartSum",



    /**
      订单模块-支付模块
    **/

    //提交订单
    API_URL_POST_SUBMIT_ORDER: "api/Sales/PlaceOrder",

    //再次预览订单
    API_URL_POST_PREVIEW_AGIN: "api/Sales/PreviewAgain",

    //创建支付订单
    API_URL_POST_CREATE_ORDER_PAY_LOG: "api/Sales/CreateOderPayLog",

    ///获取支付订单信息
    API_URL_POST_GTE_PAY_LOGINFO: "api/Sales/GetPayLogInfo",

    //微信支付
    API_URL_POST_WECHAT_PAY: "api/Sales/WechatPayByJSAPI",

    //余额支付
    API_URL_POST_MONEYPAY_PAY: "api/Sales/MoneyPayByApp",

    /**
    *个人中心
    **/
    //获取用户信息
    API_URL_GET_USER_INFO: "api/User/GetUserDetail",


    //待付款 -- 代发货  -- 已完成  --- 全部订单
    API_URL_GET_USER_ORDER: "api/Sales/GetUserOrder",

    //取消订单
    API_URL_GET_USER_CENTER_ORDER: "api/Sales/CancelOrder",

    //删除订单
    API_URL_GET_USER_DELETE_ORDER: "api/Sales/DeleteOrder",

    //获取物流信息
    API_URL_GET_USER_DELIVERY_DETAIL: "api/Sales/GetDeliveryDetail?orderId",

    //获取订单详情
    API_URL_GET_USER_ORDER_DETAIL: "api/Sales/GetOrderDetail",

    //用户分享
    API_URL_GET_SHARE_INFO: "api/HomePage/GetShareInfo?url",

    //账号绑定
    API_URL_SEND_BIND_USER: "api/User/SendBindUser",

    //用户是否绑定账户
    API_URL_GET_Is_USER_BIND: "api/User/GetIsUserBind",


    /**
     * 财务相关接口
     * */
    //用户余额
    API_URL_GET_USER_MONEY: "api/Sales/GetUserMoney",

    //明细
    API_URL_GET_ACCOUNT_DETAILITEM: "api/User/GetUserAccountDetailItem",

    //创建充值订单
    API_URL_GET_CREATESEND_ORDERPAYLOG: "api/Finances/CreateSendOderPayLog",

    //创建充值订单
    API_URL_GET_SENDOUT_CASH: "api/Finances/SendOutCash",

    //获取首页子分类和banner
    API_URL_GET_HOME_CATEGORY: "api/HomePage/GetHomeCategoryByParentId",


    //新首页
    API_URL_GET_NEW_HOME: "api/HomePage/GetNewHome",

    //获取活动所有待领取优惠券
    API_URL_POST_PROMOTION_COUPONALL: "api/Sales/GetPromotionCouponAll",

    //领取优惠券
    API_URL_POST_RECEIVE_CUSTOMERCOUPON: "api/Sales/ReceiveCustomerCoupon",

    //用户优惠券
    API_URL_GET_CUSTOMER_COUPON: "api/Sales/GetCustomerCoupon",


	/*获取url中的参数*/
	getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
	},
    setCookie(name, value) {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    addSession(obj) {
        var msg = {
            info: obj.info,
            time: new Date().getTime(),
            livetime: obj.time
        };
        sessionStorage[obj.name] = JSON.stringify(msg);
    },
    getSession(name) {
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
    },
    goIndex() {
        if(this.isStore()){
            location.href = "/home/Store"
        }else{
            location.href = "/"
        }
    },
    goCater() {
        if (this.isStore()) {
            location.href = "/Goods/GoodsShopCategory?id=cate"
        } else {
            location.href = "/Goods/Category?id=cate"
        }
    },
    isStore(){
        return this.getSession('isStore') === '1'
    },
    //修改微信Title
    headerTitle(title) {
        var $body = $('body');
        document.title = title;
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    }


};
