// pages/category/category.js
import { Category } from 'category-model.js';

var category = new Category();//实例化

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeTree:{},//数据缓存
    currType:1,
    //当前类型
    "types":[],
    typeTree:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
        url: 'https://wxplus.paoyeba.com/index.php/Api/Category/index',
        method:'get',
        data:{},
        header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          var status =  res.data.status;
          if (status == 1){
            var list = res.data.list;
            var catList =  res.data.catList;
            that.setData({
              types:list,
              typeTree:catList
            })
          }else{
            wx.showToast({
              title: res.data.err,
              duration:2000
            })
          }
          that.setData({
            currType:2
          })
        },
        error:function(e){
          wx.showToast({
            title: '网络异常',
            duration:2000
          })
        }
      })
  },

//左侧导航切换
  tabType:function(e){
    var that =  this;
    const currType = category.getDataSet(e, 'current')

    that.setData({
      currType: currType
    })


    // wx.request({
    //   url: 'https://wxplus.paoyeba.com/index.php/Api/Category/getcat',
    //   data: { cat_id: currType},
    //   header: { 'Content-Type': 'application/x-www-form-urlencoded'},
    //   method: 'post',
    //   dataType: json,
    //   success: function(res) {
    //     var status = res.data.status;
    //     if (status == 1){
    //       var catList =  res.data.catList;
    //       that.setData({
    //         typeTree:catList
    //       })
    //     }else{
    //       wx.showToast({
    //         title: res.data.err,
    //         duration:2000
    //       })
    //     }
    //   },
    //   error: function(e) {
    //     wx.showToast({
    //       title: '网络异常',
    //       duration:2000
    //     })
    //   }
    // })
  },

  //右侧数据加载
  goGoodsList:function(e){
    const goodid = category.getDataSet(e, 'goodsid');
    wx.navigateTo({
      url: '../component/goodsList/goodsList?id=' + goodid
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