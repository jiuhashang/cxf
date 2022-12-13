import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/font.css'


Vue.filter('money', function(value) {
  if(!value) return 0
  // 获取整数部分
  const intPart = Math.trunc(value)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = ''
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split('.')
  if (valueArray.length === 2) { // 有小数部分
    floatPart = valueArray[1].toString() // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
})

Vue.use(VueRouter)

Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://10.11.32.66:7700'
// axios.defaults.baseURL = 'https://www.xhhdyh.xyz:7788/guangchuchong-api'
axios.defaults.baseURL = 'http://123.60.52.140/guangchuchong-api'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
