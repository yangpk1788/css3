// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ScrollTo from '../views/ScrollTo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/scroll', component: ScrollTo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
