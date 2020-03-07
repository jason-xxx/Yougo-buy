// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //收获地址
      address:{},
      //从商品详情页存本地的商品
      goods:[],
     // 总价格
     allPrice: 0,
     //全选
     allSelect:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取本地的收货地址
     this.setData({
         //如果本地没有addres就等于一个空对象
        address: wx.setStorageSync("address")||{}
     })

  },
  onShow(){
         //因为onload只执行一次，所有需要用onShow每次打开页面都执行获取本地数据
         this.setData({
            goods:wx.getStorageSync("goods")||[],
         })
         //计算总价格
         //因为每次在进入购物车页面都要计算，使用将总价格计算方法在onShow调用
         this.handleAllPrice();
         // 每次在进入购物车页面就判断全选的状态
         this.handleAllSelect();
  },
  handleGetAddress(){
     //获取收获地址的文档=》API=》开发接口=》收获地址
     wx.chooseAddress({
        success:(res)=>{
           //把收获地址保存到data
           this.setData({
              address:{
                 //收获人：
                 name:res.userName,
                 //手机号码
                 tel:res.telNumber,
                 //详情地址
                 detail:res.provinceName+res.cityName+res.countyName+res.detailInfo
              }
           })

           //保存到本地
           wx.setStorageSync("address",this.data.address);
        }
     })
  },
  //计算总价格------------------------
  handleAllPrice(){
     let price=0;
     //循环遍历商品价格(forEach中的v指的是数组里的对象)
     this.data.goods.forEach(v=>{
       if(v.select){
          //将遍历出来的价格全部相加
          price += v.goods_price * v.number
       }
     })
     //修改总价格
     this.setData({
        allPrice:price
     })
     // 修改本地的数据
     wx.setStorageSync("goods", this.data.goods)
  },

//   点击+、-图标的变化
  handleCalc(e){
     //结构索引和nuber
     const{index,number}=e.currentTarget.dataset;
    

     //如果当前商品数为1，并且点击的是number===-1的“-”就弹窗确认取消框，确认就删除，取消就保留原来
     if(this.data.goods[index].number===1&&number===-1){
        //引入官方文档弹窗。API=》界面=》交互=》第二个
        wx.showModal({
           title: '提示',
           content: '是否删除商品',
           success:(res)=>{
              //确认删除
              if(res.confirm){
                 //使用splice方法删数组里的成员(index:索引,1：删一个)
                 this.data.goods.splice(index,1)
                 //重新修改data
                 this.setData({
                    goods:this.data.goods
                 })
                 //调用总价格
                 this.handleAllPrice();
              }
           }
        })
     } else {//else的意思就是要不数不为1，或点击的是number===1的“+”，就进行以下的计算
        //点“-”number为-1，“+”number为1（number是一开始从wxml传参结构过来的）
        this.data.goods[index].number += number;
     }
     //重新修改data的goods值
     this.setData({
        goods:this.data.goods
     })

     //调用总价格
     this.handleAllPrice();
  },
//   输入框失焦时触发
  handleBlur(e){
     //结构当先的商品的index
     const {index}=e.currentTarget.dataset;
     //结构v是输入框的值value
     let {value}=e.detail;
     //将输入框内容转换为数字
     value=Math.floor(Number(value))
     //不能让value小于1，小于1就等于1
     if(value<1){
        value=1;
     }

     //修改商品数量
     this.data.goods[index].number=value;
     //修改data中的goods
     this.setData({
        goods:this.data.goods
     })

     //调用计算总价格方法
     this.handleAllPrice();
  },
  //改变勾选状态时触发
   handleSelect(e){
      //结构当先的商品的index
      const { index } = e.currentTarget.dataset;
      //重本地结构当前的select
      const {select}=this.data.goods[index];

      //每点击一次就取反
      this.data.goods[index].select=!select

      //修改data中的goods
      this.setData({
         goods:this.data.goods
      })
      
      //计算总价格
      this.handleAllPrice();
      this.handleAllSelect();
      // console.log(this.data.allSelect)
   },
   //判断是否全选
   handleAllSelect(){
      //使用some方法返回的是布尔值，因为some方法遍历出来的v.select有一个为true返回就为true
      let suibian =this.data.goods.some(v => {
         //所有这里将取反，就变成有1个false就返回true，没有就返回false
         return !v.select 
          })
         
          this.setData({
             //需要将取反的返回值再取反才能拿到我们想要的全选规则
             allSelect: !suibian
          })   
   }
})