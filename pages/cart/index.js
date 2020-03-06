// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //收获地址
      address:{}
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
  }
})