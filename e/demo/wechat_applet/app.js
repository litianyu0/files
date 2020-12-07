//app.js
// 1.小程序不是运行在浏览器的，所以 没有Bom与dom对象
// console.log(window)  =>undefiined
// console.log(document)  =>undefiined
// 2.小程序的JS
// App方法：用于定义应用程序实例对象
// Page方法：用于定义页面对象
// getApp方法：用来获取全局应用对象
// getCurrentPages方法：获取当前资源的调用线（数组，最后一个式当前页面）
// wx对象：用来提供核心API的
// console.log(wx)
// 3.小程序的JS式支持CommonJS规范的 
// const foo = require('./utils/foo.js')
// foo.say('world')

var obj={
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
}
// 调用一个App方法(全局方法)
App(obj)

// 调用App方法左右，用来创建应用程序实例对象
// 定义应用程序的生命周期事件