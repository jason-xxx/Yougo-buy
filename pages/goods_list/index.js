import request from "../../utils/request.js"

Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 分类页的keyword(关键字)
      keyword:'',

      //存放商品
      goods:[],
      //判定商品是否加载完毕显示的字样
      hasMore:true,
      // 页面
      pagenum: 1

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
      //调用函数
      this.getGoods()
   },
   // 封装函数
   getGoods(){
      // 使用定时器模拟网络延迟（后续可删，调试用的）
      setTimeout(v => {
         //根据keyword等数据发起请求
         request({
            url: "/goods/search",
            data: {
               query: this.data.keyword,//关键字
               pagenum: this.data.pagenum,//页数
               pagesize: 10//页数显示几条
            }
         }).then(res => {
            const { message } = res.data

            //遍历修改goods的价格（保留价格两位小数点）
            const goods = message.goods.map(v => {
               v.goods_price = Number(v.goods_price).toFixed(2);
               return v
            })
            this.setData({
               // 合并原来的列表和新请求回来的商品列表，把后续请求的数据加进来
               goods: [...this.data.goods, ...goods]
            })
         })
      }, 1000)
   },
   // 页面上拉触底时候触发
   onReachBottom() {
      // 页数加1
      this.setData({
         pagenum: this.data.pagenum + 1
      });

      // 请求商品列表
      this.getGoods();
   }
   
})
