import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('../views/PricingView.vue')
    },
    {
        path: '/range',
        name: 'range',
        component: () => import('../views/RangeView.vue')
    },
    {
        path: '/request',
        name: 'request',
        component: () => import('../views/RequestView.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('../views/ManageView.vue')
    },
    {
        path: '/manage/:id',
        name: 'manage-id',
        component: () => import('../views/ManageIdView.vue')
    }
  ]
})

export default router
