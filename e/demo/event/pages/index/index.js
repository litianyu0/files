//index.js
//获取应用实例
const app = getApp()

Page({
  buttonTapHandle: function(e){
    console.log('123')
    console.log(e)
    console.dir(e)
  },
  innerHandle:function(){
    console.log("inner")
  },
  outerHandle:function(){
    console.log("outer")
  },
  tap2Handle:function(e){
    console.dir(e.target.dataset)
    // console.log(this)// 事件处理函数中的this还是页面对象，与html不一样
  },
  // e.target.dataset获取传的参数
})
