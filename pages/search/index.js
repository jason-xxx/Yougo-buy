// pages/search/index.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      inputValue:''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   // 监听输入框的值
   handelInput(e){
      // 结构value，e会返回输入框的监听事件
      const {value}=e.detail;
      this.setData({
         inputValue:value
      })
   }

})