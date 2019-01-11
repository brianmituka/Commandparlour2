import Vue from 'vue'
import axios from 'axios'
import Vuesax from 'vuesax'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import Notifications from 'vue-notification'
// import clipboard from 'clipboard'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
// Vue.prototype.$notify = Notifications
Vue.use(Vuesax)
Vue.use(Notifications)
// Vue.use(clipboard)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
