// pages/list/list.js
const fetch= require('../../utils/fetch')

Page({
  /* 页面的初始数据*/
  data: {
    category:{},// 当前加载的分类表
    shops:[], // 此分类下全部店铺
    pageIndex: 0,
    pageSize: 10,
    hasMore: true
  },
  // 加载下一页数据
  loadMore () {
    // 如果hasMore为false，就不加载新数据
    if(!this.data.hasMore) return
    // 从data中抽取2个数据
    let { pageIndex, pageSize  } = this.data
    const params = { _page: ++pageIndex, _limit: pageSize }
    return fetch(`categories/${this.data.category.id}/shops`,params)
    .then(res => {
      // 从header中获取总条数
      // x-total-count的大小写是 根据请求里header的实际情况
      const totalCount = parseInt(res.header['x-total-count'])
      const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
      // 原有数据的追加操作（而不是覆盖）
      const shops = this.data.shops.concat(res.data)
      this.setData({ shops, pageIndex,hasMore })
    })
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    fetch(`categories/${options.cat }`).then(res =>{
      //设置导航条(wx.setNavigationBarTitle) title
      // 这里无法保证子啊onready后执行，故在onready后加if，做出双保险
      this.setData({ category: res.data })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      // 加载完分类信息后，再去加载商铺信息
      this.loadMore()
    })
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },

  /*页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {
    // 重新加载数据()
    this.setData({ shops:[],pageIndex:0,hasMore:true })
    this.loadMore().then(() =>wx.stopPullDownRefresh({
      success: (res) => {
        console.log("下拉完成")
      },
    }))
  },
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this.loadMore()
  },
  // 搜索功能
  searchHandle () {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
  },
  showSearchHandle () {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle () {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle () {
    this.setData({ searchText: '' })
  },
  inputChangeHandle (e) {
    this.setData({ searchText: e.detail.value })
  }
})