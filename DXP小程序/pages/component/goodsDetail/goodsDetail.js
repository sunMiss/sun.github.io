// pages/component/goodsDetail/goodsDetail.js

import { Goods } from 'goodsDetail-model.js';
var goods = new Goods();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,//收藏
    isHidden: false,//遮罩面板
    skuShow: false,//属性选择
    goodNum:1,//商品数量
    // banner
    imgUrls: [
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 500, //  滑动动画时长1s
    circular: true,//环路

    // 商品详情介绍
    detailImg: [
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    ],
    //sku 数据
    specificationList: [
      { "颜色": "红", "尺码": "大", "型号": "A", "skuId": "3158055" },
      { "颜色": "白", "尺码": "大", "型号": "A", "skuId": "3158054" },
      { "颜色": "白", "尺码": "中", "型号": "B", "skuId": "3133859" },
      { "颜色": "蓝", "尺码": "小", "型号": "C", "skuId": "3516833" }
    ]
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  //返回首页
  toHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  //显示SKU-添加，购买
  skuShowChange() {
    this.setData({
      isHidden: true,
      skuShow: true
    })
  },
  //隐藏SKU-添加，购买
  skuHideChange:function() {
    this.setData({
      isHidden: false,
      skuShow: false
    })
  },
  //商品数量减少
  delCount:function(e) {
    var goodCount = this.data.goodNum-1;
    this.setData({
      goodNum: goodCount
    }) 
  },
  //商品数量增加
  addCount:function(e) {
    var goodCount = this.data.goodNum+1;
    this.setData({
      goodNum : goodCount
    }) 
  },
  // 输入框事件
  bindManual: function (e) {
    var goodNum = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      goodNum: goodNum
    });
  },
  //SKU选择
  clickSkuValue: function (event){
    let that = this;
    let skuNameId = goods.getDataSet(event,'nameId');
    let skuValueId = goods.getDataSet(event,'valueId');

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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