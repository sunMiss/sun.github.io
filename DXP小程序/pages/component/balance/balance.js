// pages/component/balance/balance.js
import { Balance } from 'balance-model.js';
var balance = new Balance(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //充值/提现方法
  balanceType:function(e){
    var bantype = balance.getDataSet(e, 'bantype')
    if (bantype == 'recharge'){
      wx.navigateTo({
        url: '../recharge/recharge'
      })
    }else if(bantype == 'withdrawals'){
      wx.navigateTo({
        url: '../withdrawals/withdrawals'
      })
    }else if(bantype == 'detailed'){
      wx.navigateTo({
        url: '../detailed/detailed'
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