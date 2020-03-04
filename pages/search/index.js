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
      loading:false
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
           loading:true
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
   }

})