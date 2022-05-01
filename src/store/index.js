import Vue from 'vue'
import Vuex from 'vuex'
import flowChart from './modules/flowChart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    flowChart
  }
})

export default store
