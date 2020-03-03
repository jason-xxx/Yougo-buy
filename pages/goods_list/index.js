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
      pagenum: 1,
      // 判断是否正在加载中
      loading: true

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
      // 数据都显示完了，没更多数据，就不会再请求
      if (this.data.hasMore == false) {
         return;
      }
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
             console.log(res)
            //遍历修改goods的价格（保留价格两位小数点）
            const goods = message.goods.map(v => {
               v.goods_price = Number(v.goods_price).toFixed(2);
               return v
            })
            this.setData({
               // 合并原来的列表和新请求回来的商品列表，把后续请求的数据加进来
               goods: [...this.data.goods, ...goods],
                // 当前这次请求完毕把加载页面设为false，不让页面上拉触底时候触发再次发请求
               loading: false
            })
            // 根据返回的message.total和商品列表中的数量对比判断是否是最后一页
            if (this.data.goods.length >= message.total) {
               this.setData({
                  //是最后一页就显示“没有更多数据”
                  hasMore: false
               })
            }
         })
      }, 1000)
   },
   // 页面上拉触底时候触发
   onReachBottom() {
      //上一个请求完成再通过发请求
     if(this.data.loading===false){
        // 页数加1
        this.setData({
           //每次发请求前把loading改为true！！！！！！
           loading:true,
           pagenum: this.data.pagenum + 1
        });

        // 请求商品列表
        this.getGoods();
     }
   }
   
})
