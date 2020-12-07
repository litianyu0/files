// pages/demo3/demo3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },    
  backHandle:function(){
      // 默认返回一层
      // wx.navigateBack()
      //delta数值为多少，返回多少层。(数值过大，返回到首层)
   wx.navigateBack({
     delta: 100,
   })
  }
  // wx.navigateTo()
  // wx.redirectTo()
  // wx.navigateBack()
})