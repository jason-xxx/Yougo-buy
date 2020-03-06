 import request from "../../utils/request.js"

Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 商品的详情
      detail: {},
      // 记录tab当前的索引
      current: 0,
      // 需要做图片预览的数组
      picUrls: []
        
       
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      request({
         url: '/goods/detail',
         data: {
            goods_id: options.id
         }
        
      }).then(res=>{
         console.log(res)
         const {message}=res.data;

         //获取图片的链接，给预览图片的接口使用
         const picUrls=message.pics.map(v=>{
            return v.pics_big
         });

         //保存数据到data
         this.setData({
            detail:message,
            picUrls//图片的预览接口使用
         })
      })
   },

   // 商品详情的tab切换
   handleTab(e) {
      const { index } = e.currentTarget.dataset;

      this.setData({
         current: index
      })
   },

   // 轮播图图片预览
    handlePreview(e) {
      // 获取当前点击的图片的索引值(实现点击指定图片进行预览)
      const { index } = e.currentTarget.dataset;

      // (文档 =》api => 媒体 =》图片)
       wx.previewImage({
          current: this.data.picUrls[index], // 当前显示图片的http链接
          urls: this.data.picUrls // 需要预览的图片http链接列表
       })
    },

    //跳转到购物车
   handleToCart(){
      wx.switchTab({
         url: '/pages/cart/index',
      })
   },
   //点击加入购物车按钮
   handleAddCart() {
      //保存到本地，先判断本地是否有整个大数组，如果没有就创立一个空数组
      const goods = wx.getStorageSync('goods') || []
      //使用some的数组方法判断本地goods数组里是否有这个id的商品商品，
      //如果有商品就number(商品数量)+1,假如本地goods数组没有，就将相关数据unshift保存到数组
      const exit = goods.some(v => {
         //这里通过some的数组方法利用商品的id（因为是唯一值）判断
         const isExit = v.goods_id === this.data.detail.goods_id;
         //  假如本地goods数组有这个id的商品，number+1
         if (isExit) {
            v.number += 1;
            //弹出提示框，文档=>界面=》界面=》交互=》第一个
            wx.showToast({
               title: '数量+1',
               icon: "success"
            })
         }
         return isExit;
      })
      //假如本地goods数组没有这个id的商品，就将相关数据unshift保存到数组（some方法为false）
      if (!exit) {
         goods.unshift({
            goods_id: this.data.detail.goods_id,
            goods_name: this.data.detail.goods_name,
            goods_price: this.data.detail.goods_price,
            goods_small_logo: this.data.detail.goods_small_logo,
            number: 1
         })
      }
      //将goods保存到本地
      wx.setStorageSync("goods", goods)
   }
})