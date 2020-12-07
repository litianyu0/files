//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    message: 'initial'
  },
  //事件处理函数
  inputHandle:function(e){
    // console.log(e.detail.value)
    this.setData({
      message: e.detail.value
    })
      console.log(this.data.message)
    // this.setData()依赖改变data数据的
    // 它与 直接赋值区别：setData可以通知界面做出变化；直接赋值不能实现(早期JS)
  }
})
