//index.js
//获取应用实例
const app = getApp()

Page({
  //事件处理函数
  btnTodo1: function(){
    // 交互操作组件 必须通过调用API方式使用
    wx.showActionSheet({
      // 显示出来的项目列表
      itemList: ['A', 'B', 'C'],
      // 点击其中任意一种的回调
      success:function (res) {
        // res.cancel 指的是是否点击取消
        if(!res.cancel) {
          // res.tapIndex点击的下标,
          // res只有tapIndex
          console.log(res.tapIndex)
        }
      }
    })
  },
  btnTodo2: function(){
        // 交互操作组件 必须通过调用API方式使用
        wx.showModal({
          title: '提示',
          content: '这是一个模态弹窗',
          // res有confirm、cancel
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } 
            else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      btnTodo3: function(){
        // icon:success,loading
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
})








