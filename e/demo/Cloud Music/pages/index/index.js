//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    // tabs标签栏
    tabs:['个性推荐','歌单','主播','排行榜'],
    // portals入口
    portalsList:[
      {
        img:'../../images/fm01.png',
        name:'私人FM'
      },
      {
        img:'../../images/fm02.png',
        name:'每日歌曲推荐'
      },
      {
        img:'../../images/fm03.png',
        name:'云音乐新歌榜'
      }
    ], 
     // musicList推荐歌单
     musicList:[
      {
        img:'../../images/love you.jpg',
        name:'喜欢你'
      },
      {
        img:'../../images/ten years.jpg',
        name:'十年'
      },
      {
        img:'../../images/eleven years.jpg',
        name:'十一年'
      },
      {
        img:'../../images/twelve years.jpg',
        name:'十二年'
      },
      {
        img:'../../images/love port.jpg',
        name:'爱情码头'
      },
      {
        img:'../../images/later.jpg',
        name:'后来'
      }
    ]
  }
})
