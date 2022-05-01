import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/setting/site/flow_chart/index.vue'),
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
