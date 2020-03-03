// pages/goods_list/index.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 分类页的keyword(关键字)
      keyword:''

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      //将在分类页的keyword从options中结构出来
      const {keyword}=options;
      //存到data中，方便请求调用
      this.setData({
         keyword
      })
      // console.log(keyword)
   }

})
