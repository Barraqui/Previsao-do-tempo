import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/layout/index.vue'),
    },
    {
      path: '/*',
      name: '404',
      component: () => import('@/modules/404/index.vue'),
    },
    {
      path: '/telaInicial',
      name: 'Tela',
      component: () => import('@/layout/telaInicial/index.vue'),
    },
    {
      path: '/previsaoTempo/:cidade',
      name: 'TelaPrevisaoTempo',
      component: () => import('@/layout/telaPrevisaoTempo/index.vue'),
    },
  ],
})

export default router
