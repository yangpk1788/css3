// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ScrollTo from '../views/ScrollTo.vue'
import Layout from '../views/Layout.vue'
import Datepick from '../views/Datepick.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/scroll', component: ScrollTo },
  { path: '/layout', component: Layout },
  { path: '/datepick', component: Datepick }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
