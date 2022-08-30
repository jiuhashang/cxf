import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/font.css'


Vue.filter('money', function(val) {
  val = val.toString().replace(/[$,]/g, '')
  if(isNaN(val)) {
    val = '0'
  }
  let sign = val == (val = Math.abs(val))
    val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
    val = Math.floor(val / 100).toString()
  if(cents < 10) {
    cents = '0' + cents
  }
  for(var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }
  return (((sign) ? '' : '-') + val + '.' + cents)
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
