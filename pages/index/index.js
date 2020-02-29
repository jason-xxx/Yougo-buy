import requset from "../../utils/request.js";

Page({

data:{
//轮播图
banners:[]
},
onLoad(){
  //请求轮播图接口
  requset({
    url:"/home/swiperdata"
  }).then(res=>{
    //在res.data解构message轮播图数组
    const {message}=res.data;
    console.log(message)
    this.setData({
      banners:message
    })
  })
}
})
