import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenicated, isAdmin,requierAuth } from '@/guards/Roles'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      beforeEnter: isAuthenicated,
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // beforeEnter: isAdmin,
      path: '/about',
      name: 'about',
      //beforeEnter,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      // beforeEnter: requierAuth,
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue')
    },
    {
      // beforeEnter: requierAuth,
      path: '/register',
      name: 'register',
      component: () => import('@/modules/auth/views/RegisterView.vue')
    },
    {
      beforeEnter: requierAuth,
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/modules/auth/views/ForgotView.vue')
    },
    {
      // beforeEnter: requierAuth,
      // beforeEnter: isAuthenicated,
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/modules/auth/views/ResetPasswordView.vue'),

      beforeEnter: (to, from, next) => {
        const isAuthenicated = true;
        const showNavbar = false;

        if (isAuthenicated) {
          to.meta.showNavbar = showNavbar;
          next();
        }
        else {
          next({ name: 'login' });
        }
      }

    },
    {
      beforeEnter: isAuthenicated,
      path: '/profile',
      name: 'profile',
      component: () => import('@/modules/profile/views/ProfileView.vue')
    }
  ]
})

export default router
