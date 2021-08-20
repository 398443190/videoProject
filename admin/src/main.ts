import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/avue.js'
import Axios from 'axios'
import EleForm from 'vue-ele-form'

Vue.use(EleForm)
Vue.config.productionTip = false
const http = Axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$http = http
// Vue.prototype.$httpajax = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
