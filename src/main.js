import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mars3d/dist/mars3d.css'
import axios from 'axios'
import 'mars3d-space'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
