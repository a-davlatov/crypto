import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/composables/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('../views/HomeView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/nft',
      name: 'nft',
      component: () => import('../views/NftView.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue')
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: () => import('../views/ExchangesView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountSettingsView.vue'),
      beforeEnter: (to) => {
        if (!store.signedIn && to.name !== 'accessDenied') return { name: 'accessDenied' }
      },
    },
    {
      path: '/mynfts',
      name: 'mynfts',
      component: () => import('../views/MyNftsView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/access-denied',
      name: 'accessDenied',
      component: () => import('../views/AccessDeniedView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
  ]
})

export default router
