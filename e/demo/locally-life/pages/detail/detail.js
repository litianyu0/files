const fetch = require('../../utils/fetch')

Page({
  data: {
    // 商铺的shop
    shop: {}
  },
  /* 生命周期函数--监听页面加载*/
  // 获取上铺的详细信息shop数组
  onLoad (options) {
    fetch(`/shops/${options.item}`)
      .then(res => {
        this.setData({ shop: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
      })
  },
// 封面视图
  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  }
})
