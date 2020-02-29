// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //记录当前点击哪个分类
    suoyin:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击左边分类菜单时
  handleClick(e){
    //获取for循环的index
    const{index}=e.currentTarget.dataset;

    this.setData({
      suoyin:index
    })
    
  }

})