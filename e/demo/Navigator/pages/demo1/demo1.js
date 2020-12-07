// pages/demo1/demo1.js
Page({
  data: {

  },
  tapHandle:function(){
    // 点击按钮，系统自动执行这里代码
    wx.navigateTo({
      url: '../demo2/demo2',
    })
    
    // 没有返回按钮，没有返回记录（相当于navigator+redirect）
    // wx.redirectTo({
    //   url: '/pages/demo2/demo2',
    // })
  }
})