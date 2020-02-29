import request from "../../utils/request.js";

Page({

data:{
   //轮播图
   banners:[],

   //菜单图标数据
   menus:[],

   //楼层数据
   floors:[],

   // 是否显示回到顶部
   isShowTop: false
},
onLoad(){
  //请求轮播图接口--------------------
  request({
    url:"/home/swiperdata"
  }).then(res=>{
    //在res.data解构message轮播图数组
    const {message}=res.data;
    // console.log(message)
    this.setData({
      banners:message
    })
  }),

  //请求菜单图标接口--------------------
  request({
    url: '/home/catitems',
  }).then(res=>{
    // console.log(res)
    //在res.data解构message菜单栏数组
    const{message}=res.data;
    
    //将数组进行改造，通过map方法返回一个新数组
    const newData=message.map((value,index)=>{
    //给索引为0的值添加url，即给分类图标添加url
        if(index===0){
          value.url="/pages/category/index"
        }
        //否则return
      return value;
    })
    this.setData({
      menus: newData
    })
  })
  
  //请求楼层图片接口--------------------------
  request({
    url:'/home/floordata'
  }).then(res=>{
    // console.log(res)
    const {message}=res.data
    this.setData({
      floors:message
    })
  })

},
//小程序回到顶部方法---------------------------
handleToTop(){
  wx.pageScrollTo({
    scrollTop: 0,
    duration:300
  })
},

  // 监听页面的滚动事件------------------------
  onPageScroll(e) {
    const { scrollTop } = e;
    // 当前的状态
    let isShow = this.data.isShowTop;

    // 判断如果滚动高度大于300，显示回到顶部的按钮
    if (scrollTop > 300) {
      isShow = true
    } else {
      isShow = false
    }
    
    // 避免频繁的操作setData，所以如果下面两个值是相同就没必要再赋值了
    if (isShow == this.data.isShowTop) return;
    // console.log("测试是否频繁操作")
    this.setData({
      isShowTop: isShow
    })
  }
})
