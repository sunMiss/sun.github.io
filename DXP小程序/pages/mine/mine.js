// pages/mine/mine.js
import { Mine } from 'mine-model.js';
var mine = new Mine();


//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

//获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //个人中心切换到其他页面
  mineType:function(e){
    var minType = mine.getDataSet(e, 'mintype')
    //待付款
    if (minType == 'pay'){
      wx.navigateTo({
        url: '../component/order/order?type='+0
      })
    //待收货
    } else if (minType == 'goods'){
      wx.navigateTo({
        url: '../component/order/order?type='+1
      })
    //已完成
    } else if (minType == 'end') {
      wx.navigateTo({
        url: '../component/order/order?type='+2
      })
    //全部订单
    } else if (minType == 'order') {
      wx.navigateTo({
        url: '../component/order/order?type='+3
      })
    //优惠卷
    } else if (minType == 'coupon') {
      wx.navigateTo({
        url: '../component/coupon/coupon'
      })
    //余额
    } else if (minType == 'balance') {
      wx.navigateTo({
        url: '../component/balance/balance'
      })
    //账号绑定
    } else if (minType == 'binding') {
      wx.navigateTo({
        url: '../component/bindAccount/bindAccount'
      })
    //地址管理
    } else if (minType == 'address') {
      wx.navigateTo({
        url: '../component/address/address'
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})