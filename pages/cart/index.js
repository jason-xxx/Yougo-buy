// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //收获地址
      address:{},
      //从商品详情页存本地的商品
      goods:[],
     // 总价格
     allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取本地的收货地址
     this.setData({
         //如果本地没有addres就等于一个空对象
        address: wx.setStorageSync("address")||{}
     })

  },
  onShow(){
         //因为onload只执行一次，所有需要用onShow每次打开页面都执行获取本地数据
         this.setData({
            goods:wx.getStorageSync("goods")||[],
         })
         //计算总价格
         //因为每次在进入购物车页面都要计算，使用将总价格计算方法在onShow调用
         this.handleAllPrice();
  },
  handleGetAddress(){
     //获取收获地址的文档=》API=》开发接口=》收获地址
     wx.chooseAddress({
        success:(res)=>{
           //把收获地址保存到data
           this.setData({
              address:{
                 //收获人：
                 name:res.userName,
                 //手机号码
                 tel:res.telNumber,
                 //详情地址
                 detail:res.provinceName+res.cityName+res.countyName+res.detailInfo
              }
           })

           //保存到本地
           wx.setStorageSync("address",this.data.address);
        }
     })
  },
  //计算总价格------------------------
  handleAllPrice(){
     let price=0;
     //循环遍历商品价格(forEach中的v指的是数组里的对象)
     this.data.goods.forEach(v=>{
        //将遍历出来的价格全部相加
         price+=v.goods_price;
     })
     //修改总价格
     this.setData({
        allPrice:price
     })
  },

//   点击+、-图标的变化
  handleCalc(e){
     //结构索引和nuber
     const{index,number}=e.currentTarget.dataset;
     //点“-”number为-1，“+”number为1
     this.data.goods[index].number+=number;

     //重新修改data的goods值
     this.setData({
        goods:this.data.goods
     })
  }
})