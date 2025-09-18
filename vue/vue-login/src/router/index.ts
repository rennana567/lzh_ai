import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login'
  }, {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    name: 'home',
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(to, from, "||||||", "路过");
  if (to.meta.requiresAuth && !useStore().isLogin) {
    next('/login')
  } else {
    next();
  }
});


export default router;