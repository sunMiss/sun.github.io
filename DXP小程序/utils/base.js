/**
 * Created by sun on 2018/1/10.
 */
import { Token } from 'token.js';
import { Config } from 'config.js';

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = Config.restUrl;
    this.onPay = Config.onPay;
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch) {
    var that = this,
      url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        // 判断以1（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '1') {
          // if(params.sCallBack){
          //   params.sCallBack(res)
          // }  与下面等同
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
      }
    });
  }

  //错误提示
  _processError(err) {
    console.log(err);
  }

  //重新请求服务器获取Token
  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };




  /*
  * api数据接口
  */
  //首页数据接口
  getHomeBannersUrl = 'index/index';  //首页banner 接口
  getHomeShopingUrl = 'index/index';//首页商品列表接口

  //分类数据接口
  getCateLeGoodsUrl = 'index/index';//分类左侧接口
  getCateRiGoodsUrl = 'index/index';//分类右侧接口

  //购物车数据接口
  getCartShopingUrl = 'index/index';//购物车商品获取接口
  getCartShopDelUrl = 'index/index';//购物车商品删除接口
  getCartShopPayUrl = 'index/index'; //购物车结算接口

  //个人中心数据接口
  getMineUseringUrl = 'index/index';//个人中心用户获取接口
  getMineOrderssUrl = 'index/index'; //订单接口
  getMineCoupersUrl = 'index/index'; //优惠卷接口
  getMineCouUserUrl = 'index/index'; //优惠卷使用接口
  getMineBalanceUrl = 'index/index'; //余额接口
  getMineBaOrderUrl = 'index/index'; //余额账单明细接口
  getMineBaCreadUrl = 'index/index'; //余额充值接口
  getMineBaPostlUrl = 'index/index'; //余额提现接口
  getMineBindAccUrl = 'index/index'; //账号绑定接口
  getMineAddressUrl = 'index/index'; //地址管理接口
  getMineNewAddsUrl = 'index/index'; //地址新增接口
  getMineNewAddsUrl = 'index/index'; //地址编辑接口
  getMineDelAddsUrl = 'index/index'; //地址删除接口
  getMineSetAddsUrl = 'index/index'; //地址设置默认接口

  //其他接口

  getGoodsSearchUrl = 'index/index'; //商品搜索接口
  getGoodsListcsUrl = 'index/index'; //商品列表接口

  getGoodsDetailUrl = 'index/index'; //商品详情接口
  getGoodAddCartUrl = 'index/index'; //添加购物车接口
  getGoodStarBuyUrl = 'index/index'; //立即购买接口


  getOrderComfigUrl = 'index/index'; //确认订单接口
  getOrderPayingUrl = 'index/index'; //订单支付接口







};

export { Base };
