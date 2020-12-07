// 把http请求封装成一个Promise  
module.exports = (url,data) => {
return new Promise((resolve,reject) =>{
  wx.request({
    url: `https://locally.uieee.com/${url}`,
    data:data,
    success: resolve,
    fail: reject
  })
})
}
