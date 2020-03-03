import request from "../../utils/request.js"

Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 分类页的keyword(关键字)
      keyword:'',

      //存放商品
      goods:[]

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

      //根据keyword等数据发起请求
      request({
         url: "/goods/search",
         data:{
            query:this.data.keyword,
            pagenum:1,
            pagesize:10
         }
      }).then(res=>{
         const { message}=res.data
         
         //遍历修改goods的价格（保留价格两位小数点）
         const goods=message.goods.map(v=>{
            v.goods_price= Number(v.goods_price).toFixed(2);
            return v
         })
         this.setData({
            goods
      })
      })
      
   }
   
})
