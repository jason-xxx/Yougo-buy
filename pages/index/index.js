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
}
})
