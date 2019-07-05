import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './plugins/element.js'

Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
