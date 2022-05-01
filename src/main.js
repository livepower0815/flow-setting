import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/element-variables.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

// set ElementUI lang to zh-CN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
// Vue.config.devtools = true
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
