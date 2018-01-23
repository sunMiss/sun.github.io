// pages/component/newAddress/newAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      setDefault:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //表单验证
  formSubmit: function (e) {
    console.log(e.detail.value)
    const val = e.detail.value,
          user = val.user,
          mobile = val.mobile,
          address = val.address,
          code = val.code,
          detailed = val.detailed;
    console.log(detailed)
    if (user.length == 0){
      wx.showToast({
        title: '用户名不能为空!',
        icon: 'loading',
        duration: 500
      })
    }else if(mobile.length != 11){
      wx.showToast({
        title: '手机号码格式错误!',
        icon: 'loading',
        duration: 500
      })
    }else if(address.length == 0) {
      wx.showToast({
        title: '区域不能为空!',
        icon: 'loading',
        duration: 500
      })
    }else if(code.length != 6) {
      wx.showToast({
        title: '邮编不能为空!',
        icon: 'loading',
        duration: 500
      })
    }else if(detailed.length == 0) {
      wx.showToast({
        title: '地址不能为空!',
        icon: 'loading',
        duration: 500
      })
    }else{
      //数据请求
      wx.showToast({
        title: '数据请求中。。。!',
        icon: 'loading',
        duration: 2000
      })
    }  
       


    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  //设置默认地址
  defaultAddress:function(e){
    //请求
    this.setData({
      setDefault: true
    })
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