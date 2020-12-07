import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import './plugins/element.js'
// 阿里图标库
import './assets/fonts/iconfont.css'
// 全局样式
import './assets/css/global.css'
// 树形表插件
import TreeTable from 'vue-table-with-tree-grid'
//文本编辑插件
import VueQuillEditor from 'vue-quill-editor'
// require styles


import Nprogress from 'nprogress'



import axios from 'axios'

// 配置请求路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(config => {
  Nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  Nprogress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)
Vue.filter('dataForm', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + "").padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${ss}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')