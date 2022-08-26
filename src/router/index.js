import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { path: '/coordinate' },
  },
  {
    path: '/coordinate',
    name: 'coordinate',
    component: () => import('@/views/coordinate.vue'),
  },
  {
    path: '/draw',
    name: 'draw',
    component: () => import('@/views/draw.vue')
  },
  {
    path: '/geojson',
    name: 'geojson',
    component: () => import('@/views/geojson.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import('@/views/area.vue')
  },
  {
    path: '/z-index',
    name: 'z-index',
    component: () => import('@/views/z-index.vue')
  },
  {
    path: '/wms',
    name: 'wms',
    component: () => import('@/views/wms.vue')
  },
  {
    path: '/orbital',
    name: 'orbital',
    component: () => import('@/views/orbital.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
