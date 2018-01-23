import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象

var app = getApp();
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:"",//窗口高度
    currentTab:0,//预设当前项的值
    scrollLeft:0,//tab标题的滚动位置
    honeNavList:[
      { name: '热门推荐', id: 121 }, 
      { name: '生活用品', id: 122 },
      { name: '母婴用品', id: 123 },
      { name: '居家服饰', id: 123 },
      { name: '文化匠心', id: 124 },
      { name: '精选美食', id: 125 },
      { name: '外出服饰', id: 126 },
      { name: '数码电器', id: 127 }
    ]
  },

  //滚动切换标签样式
  switchTab:function(e){
      this.setData({
        currentTab:e.detail.current
      })
      this.checkCor(e);
  },

  //点击标题切换当前选项样式
  swichNav:function(e){
    var cur = e.target.dataset.current;
    if(this.data.currentTaB == cur){
      return false
    }else{
      this.setData({
        currentTab: cur
      })
    }
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条
  checkCor:function(e){
    if(this.data.currentTab>4){
      console.log(e)
      this.setData({
        scrollLeft:600
      })
    }else{
      this.setData({
        scrollLeft: 0
      })
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(2)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取小程序信息
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        //var calc = clientHeight * rpxR-180;
        console.log(res.screenHeight)
        //console.log(clientHeight + '-' + clientWidth + '-' + rpxR+'-'+calc)
        that.setData({
          winHeight: res.screenHeight*2-405
        });  
      },
    })


    this._loadData();
  },

  /** 
   * 加载所有数据
  **/
  _loadData:function(callback){
    var that =  this;
    index.getBannerData((data) => {

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