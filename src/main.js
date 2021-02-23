import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authService from './services/auth'
import initializeHttpInterceptors from './http/interceptors'

import '@/assets/scss/base.scss'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// init auth service
authService.restoreAuthTokens()

// init http client interceptors
initializeHttpInterceptors()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
