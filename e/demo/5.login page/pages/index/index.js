//index.js
//获取应用实例
const app = getApp()
// 1.设计数据的结构（data属性）
// 2.将数据绑定到元素上
// 3.登陆按钮添加点击事件

// 1.原始代码
// Page({
//   data: {
//     username: 'admin',
//     password: '123'
//   },
  // 用户名文本框绑定事件
  // usernameChangeHandle:function(e){
  //   this.setData({
  //     username: e.detail.value
  //   })
  // },
  //   // 密码文本框绑定事件
  // passwordChangeHandle:function(e){
  //   this.setData({
  //     password: e.detail.value
  //   })
  // },

  // 登陆按钮点击事件
  // loginHandle:function(){
  //   todo 完成逻辑
  //   1.需要知道 用户输入的值，
  //   console.log(this.data)
  //   2.根据用户输入的值判断， 
  //   if(this.data.username==="admin" &&  this.data.password==="123"){
  //     console.log("登陆成功")
  //   }else{
  //     console.log("登陆失败")
  //   }
    //// ！！！this.data.username===e.target.dataset.username,值还是一样，但不是data中默认的值,所以传参不合适，
    // 不知道如何获得data中的默认值（数据库的值）

    // 3.根据判断结果做出响应 
//   }
// })

// //2. 抽取用户名、密码事件函数
// // 1.设计数据的结构（data属性）
// // 2.将数据绑定到元素上
// // 3.登陆按钮添加点击事件
// Page({
//   data: {
//     username: 'admin',
//     password: '123'
//   },
//   // 用户名文本框绑定事件
//     inputChangeHandle:function(e){
//       var prop=e.target.dataset['prop']
//       var changed={}
//       changed[prop]=e.detail.value
//       this.setData(changed)
//       // e.target.dataset传参的值，e.detail.value文本框输入的值
//   },
//   // 登陆按钮点击事件
//   loginHandle:function(){
//     // todo 完成逻辑
//     // 1.需要知道 用户输入的值，
//     console.log(this.data)
//     // 2.根据用户输入的值判断， 
//     if(this.data.username==="admin" &&  this.data.password==="123"){
//       console.log("登陆成功")
//     }else{
//       console.log("登陆失败")
//     }
//     // ！！！this.data.username===e.target.dataset.username,值还是一样，但不是data中默认的值,所以传参不合适，
//     // 不知道如何获得data中的默认值（数据库的值）
//     // 3.根据判断结果做出响应 
//   }
// })

//3. form表单的使用
// 1.设计数据的结构（data属性）
// 2.将数据绑定到元素上
// 3.登陆按钮添加点击事件
Page({
  data: {
    username: 'admin',
    password: '123'
  },
  // 表单提交事件
  loginHandle:function(e){
    console.log(e.detail.value)
    console.log(e.detail.value.username+'--' + e.detail.value.password)

    // if(e.detail.value.username==="admin" &&  e.detail.value.password==="123"){
    //   console.log("登陆成功")
    // }else{
    //   console.log("登陆失败")
    // }
    // 3.根据判断结果做出响应 
  }
})