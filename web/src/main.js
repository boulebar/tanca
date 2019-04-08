import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

if(process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'http://localhost:3000'
} else {
  axios.defaults.baseURL = '/api'
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
