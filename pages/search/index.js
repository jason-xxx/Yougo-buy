import request from "../../utils/request.js"

Page({

   /**
    * 页面的初始数据
    */
   data: {
      inputValue:'',
      // 搜索建议
      recommend:[],
      //设置一个开关座节流防抖的 “开关”
      loading:false,
      //设置一个最后一次输入框，输入的值
      lastValue:"",
      //本地储存历史记录
      history:[]
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     //获取本地数据
     let arr =wx.getStorageSync("history",arr)
     //判断本地有没有数据，如果没有或者不是数组，就将它定义为一个空数组
     if (!Array.isArray(arr)) {
        arr = [];
     }

     //将本地数据存到data，方便渲染
     this.setData({
        history:arr
     })
     
   },
   // 监听输入框的值
   handelInput(e){
      // 结构value，e会返回输入框的监听事件
      const {value}=e.detail;
      this.setData({
         inputValue:value
      })
      // 如果value有值才请求,否则不请求
      if(!value){
         //如果输入框为空就清空数组；
         this.setData({
            recommend:[]
         })
         return;
      }
         //  输入框变化时 发送请求获取相应关键字结果（搜索建议）
         this.getRecommend();
   },

   //将上面的获取搜索建议请求封装起来
   getRecommend(){
      
      //如果开关是关着的就发出请求
      if(this.data.loading===false){

        //通过loading=false进来后，就把loading开关改为true
        this.setData({
           loading:true,
           //记录当前输入框的值
           lastValue:this.data.inputValue
        })

         request({
            url: '/goods/qsearch',
            data: {
               query: this.data.inputValue//封装后这个要改
            }
         }).then(res => {
            // console.log(res)
            const { message } = res.data;
            //保存搜索建议
            this.setData({
               recommend: message,
               //请求完成后将开关重新改为false,从而做到节流防抖作用
               loading:false
            })
            //到最后判断lastValue值是不是最新，如果不是就重新调用函数，再次发起请求
            if(this.data.lastValue!==this.data.inputValue){
                this.getRecommend();
            }
         })
      }
   },
   //点击取消按钮的事件，
   handleCancel(){
      this.setData({
         recommend: [],
         //这里要在wxml到input添加value="{{inputValue}}"
         inputValue: ''
      })
      return;
   },
   //添加回车跳转到商品列表事件
   handleEnter(){
      //回车的时候把关键字存到本地存储 （wx.setStorageSync）在 文档=》API=》数据缓存

      //每次存储数组前先把本地的数据获取回来
      let arr =wx.getStorageSync('history');

      //判断本地有没有数据，如果没有或者不是数组，就将它定义为一个空数组
      if(!Array.isArray(arr)){
         arr=[];
      }
      //把新获取回来的数组 添加到数组第一位
      arr.unshift(this.data.inputValue);

      //数组去重，避免两个相同的搜索记录显示出来，新的添加到最前面就行
      arr=[...new Set(arr)]

      //回车的时候把关键字存到本地存储 
      wx.setStorageSync('history',arr)

      //小程序的跳转页面方法（wx.redirectTo）在 文档=》API=》路由
      wx.redirectTo({//使用wx.redirectTo不用点击返回时多次返回到搜索页
         url: '/pages/goods_list/index?keyword='+this.data.inputValue,
      })
   }

})