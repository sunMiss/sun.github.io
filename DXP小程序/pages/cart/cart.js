// pages/cart/cart.js
import { Cart } from 'cart-model.js';
var cart = new Cart(); //实例化 购物车

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData:[
      {
        "storeId": "99358acc-fe74-42cb-b791-69a1eacbfee0",
        "storeName": "京东商城",
        'sub':0,
        isSelect:false,
        goods:[
          {
            goodsId: "acbcd588-040b-4d0a-827b-a8112626e1e1",
            pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148058328876.jpg",
            name: "日本资生堂洗颜",
            attributeValues: "蓝色,M",
            price: 20,
            isSelect: false,
            'sub': 0,
            // 数据设定
            quantity: 2,
            min: 1,
            max: 20
          },
          {
            goodsId: "acbcd588-040b-4d0a-827b-a8112626e1e2",
            pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058301941.jpg',
            name: "倩碧焕妍活力精华露",
            attributeValues: "白色,M",
            price: 30,
            isSelect: false,
            'sub': 0,
            // 数据设定
            quantity: 1,
            min: 1,
            max: 20
          },
        ]
      },
      {
        "storeId": "99358acc-fe74-42cb-b791-69a1eacbfee0",
        "storeName": "淘宝商城",
        'sub': 1,
        isSelect: false,
        goods: [
          {
            goodsId: "acbcd588-040b-4d0a-827b-a8112626e1e3",
            pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
            name: "特效润肤露",
            attributeValues: "蓝色,M",
            price: 30,
            isSelect: false,
            'sub': 1,
            // 数据设定
            quantity: 3,
            min: 1,
            max: 20
          },
          {
            goodsId: "acbcd588-040b-4d0a-827b-a8112626e1e4",
            pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058228431.jpg',
            name: "倩碧水嫩保湿精华面霜",
            attributeValues: "红色,M",
            price: 40,
            isSelect: false,
            'sub': 1,
            // 数据设定
            quantity: 1,
            min: 1,
            max: 20
          }
        ]  
      }
    ],//商品数据
    goodNum:1, //商品数量
    isEditCart: false,//编辑
    isAllSelect: false,//全选
    selectedCounts:0,//商品数量
    totalMoney: 0,//总价
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //编辑
  editChange:function(event){
    var edit = this.data.isEditCart = !this.data.isEditCart; 
    this.setData({
      isEditCart: edit
    })
  },
  //删除
  deleteList:function(event){
    let that = this,
        sub = cart.getDataSet(event, 'sub'),//店铺下标
        index = cart.getDataSet(event, 'index');//商品下标
    let newData = this.data.cartData;
    wx.showModal({
      title: '提示',
      content: '确定删除该商品',
      success: function (res) {
        if (res.confirm) {
          that.data.cartData[sub].goods.splice(index, 1);              // 删除购物车列表里这个商品
          that.setData({
            cartData: newData,
          })
          if (!that.data.cartData[sub].goods.length) {
            that.data.cartData.splice(sub, 1);
            that.setData({
              cartData: that.data.cartData
            })
          }
          if (!that.data.cartData.length) {
            that.setData({
              cartData: that.data.cartData
            })
          } else {
            let newData = that._calcTotalAccountAndCounts(that.data.cartData); /*重新计算总金额和商品总数*/
            that.setData({
              cartData: that.data.cartData,
              totalMoney: newData.account,
              selectedCounts: newData.selectedCounts,
            });
          }

          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //数量增加
  addCount(event) {
    let sub = cart.getDataSet(event, 'sub'),//店铺下标
      index = cart.getDataSet(event, 'index');//商品下标
    let num = this.data.cartData[sub].goods[index].quantity;//当前商品数量
    num = num + 1;
    this.data.cartData[sub].goods[index].quantity = num;
    var newData = this._calcTotalAccountAndCounts(this.data.cartData); /*重新计算总金额和商品总数*/
    this.setData({
      cartData: this.data.cartData,
      totalMoney: newData.account,
      selectedCounts: newData.selectedCounts, 
    });

  },
  //数量减少
  minusCount(event) {
    let sub = cart.getDataSet(event, 'sub'),//店铺下标
      index = cart.getDataSet(event, 'index');//商品下标
    let num = this.data.cartData[sub].goods[index].quantity;//当前商品数量
    num = num - 1;
    this.data.cartData[sub].goods[index].quantity = num;
    var newData = this._calcTotalAccountAndCounts(this.data.cartData); /*重新计算总金额和商品总数*/
    this.setData({
      cartData: this.data.cartData,
      totalMoney: newData.account,
      selectedCounts: newData.selectedCounts,
    });
  },
  //商品Check
  checkedItem:function(event){
    let i = 0, stortLen = 0, allLen = 0;
    var sub = cart.getDataSet(event,'sub'),//店铺下标
        index = cart.getDataSet(event, 'index');//商品下标
    this.data.cartData[sub].goods[index].isSelect = !this.data.cartData[sub].goods[index].isSelect;//状态取反
    var newList = this.data.cartData; 
    //判断是否店铺全选
     for (i = 0; i < newList[sub].goods.length;i++){
       if (newList[sub].goods[i].isSelect){
         stortLen++;
       }
     }
     if (newList[sub].goods.length == stortLen){
       newList[sub].isSelect = true;
     }else{
       newList[sub].isSelect = false;
     }

     //判断是否全部选择
     for (i = 0; i < newList.length;i++){
       if (newList[i].isSelect){
         allLen++;
       }
     }
     if (newList.length == allLen){
       var isAllSelect = true;
     }else{
       var isAllSelect = false;
     }
     var newData = this._calcTotalAccountAndCounts(newList); /*重新计算总金额和商品总数*/
    this.setData({
      cartData: newList,
      totalMoney: this.data.totalMoney,
      isAllSelect: isAllSelect,
      totalMoney: newData.account,
      selectedCounts: newData.selectedCounts, 
    })
  },

  //店铺Check
  toggleSelectStort: function (event) {
    let i = 0;
    var sub = cart.getDataSet(event, 'sub');//店铺下标
    var data = this.data.cartData;
    this.data.cartData[sub].isSelect = !this.data.cartData[sub].isSelect;
    // 判断全选
    let accNum=0;
    for(i=0;i<data.length;i++){
      if (data[i].isSelect){
        accNum++;
      }
    }
    if (data.length == accNum){
      var isAllSelect = true;
    }else{
      var isAllSelect = false;
    }
    // 判断商品选择
    if (!data[sub].isSelect){
      for(i=0;i<data[sub].goods.length;i++){
        this.data.cartData[sub].goods[i].isSelect = false;
      }
    }else{
      for (i = 0; i < data[sub].goods.length; i++) {
        this.data.cartData[sub].goods[i].isSelect = true;
      }
    }
    var newData = this._calcTotalAccountAndCounts(data); /*重新计算总金额和商品总数*/
    this.setData({
      cartData: data,
      isAllSelect: isAllSelect,
      totalMoney: newData.account,
      selectedCounts: newData.selectedCounts, 
    });

  },
  
  //全选Check
  toggleSelectAll:function(event){
    let i = 0,j = 0;
    var data = this.data.cartData;
    if(!this.data.isAllSelect){
      for (i = 0; i < data.length;i++){
        this.data.cartData[i].isSelect = true;
        for (j = 0; j < data[i].goods.length; j++) {
          this.data.cartData[i].goods[j].isSelect = true;
        }
      }
      
    }else{
      for (i = 0; i < data.length; i++) {
        this.data.cartData[i].isSelect = false;
        for (j = 0; j < data[i].goods.length; j++) {
          this.data.cartData[i].goods[j].isSelect = false;
        }
      }
    }
    var newData = this._calcTotalAccountAndCounts(data); /*重新计算总金额和商品总数*/
    this.setData({
      cartData: data,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: newData.account,
      selectedCounts: newData.selectedCounts, 
    }); 
  },

  /*
    * 计算总金额和选择的商品总数
    * */
  _calcTotalAccountAndCounts: function (data) {
    let i = 0, j = 0, len = data.length,
      //所需要计算的总价格，但是要注意排除未选中的商品
      account = 0,
      //购买商品的总个数
      selectedCounts = 0,
      //购买商品种类的总数
      selectedTypeCounts = 0;
    let multiple = 100;
    //避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
    for (i = 0; i < len;i++){
      for (j = 0; j < data[i].goods.length;j++){
        if (data[i].goods[j].isSelect){
          account += data[i].goods[j].quantity * multiple * Number(data[i].goods[j].price) * multiple;
          selectedCounts += data[i].goods[j].quantity;
          selectedTypeCounts++;
        }
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple * multiple)
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