//引入基础 Base  类
import { Base } from '../../utils/base.js';


//继承 Base 类
class Index extends Base{
  constructor(){
    super();//鸡肋构造函数
  }

  //首页信息数据
  getBannerData(callback){
    var that=this;
    //调用Base  数据请求
    var param = {
      url: this.homeBannerUrl,
      sCallback:function(data){
        data=data.items;
        callback && callback(data)
      }
    }
    this.request(param);
  }

  //首页商品数据
  getProductorData(callback){
    console.log(1231)
  }



}

export { Index};