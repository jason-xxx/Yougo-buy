import request from "../../utils/request.js";

Page({

data:{
   //轮播图
   banners:[],

   //菜单图标数据
   menus:[]
},
onLoad(){
  //请求轮播图接口
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

  //请求菜单图标接口
  request({
    url: '/home/catitems',
  }).then(res=>{
    console.log(res)
    //在res.data解构message菜单栏数组
    const{message}=res.data;
    this.setData({
      menus:message
    })
  })
}
})
