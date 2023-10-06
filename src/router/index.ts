import { createRouter, createWebHistory, type NavigationGuard, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenicated,requierAuth } from '@/guards/Roles'
import { useRouteStore } from '@/stores/RouteStore';



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
      beforeEnter: requierAuth,
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue')
    },
    {
      //  beforeEnter: requierAuth,
      path: '/manage-product',
      name: 'manage-product',
      component: () => import('@/modules/products/views/ManageProductView.vue')
    },
    {
      beforeEnter: requierAuth,
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

      beforeEnter: (to:any, from:any, next:any) => {
        const r = useRouteStore();
        r.setRemoveNav(true);
        const isAuthenicated = true;
        const showNavbar = false;

        if (isAuthenicated) {
          to.meta.showNavbar = showNavbar;
          next();
        }
        else {
          next({ name: 'login' });
        }
      },
      beforeLeave: (_to: any, _from: any, next: any) => {
        const r = useRouteStore();
        r.setRemoveNav(false);
        next();
        // Llama a next() para continuar con la navegación a la siguiente ruta
      },
    },
    {
      beforeEnter: isAuthenicated,
      path: '/profile',
      name: 'profile',
      component: () => import('@/modules/profile/views/ProfileView.vue')
    },
    {
      beforeEnter: isAuthenicated,
      path: '/test-upload',
      name: 'test-upload',
      component: () => import('@/modules/profile/views/TestUploadView.vue')
    },
    // Rutas Necesarias para acceder a Products, ProductDetail, Cart...
    {
      beforeEnter: isAuthenicated,
      path: '/products',
      name: 'products',
      component: () => import('@/modules/products/productsView.vue')
    },
    {
      beforeEnter: isAuthenicated,
      path: '/productDetail/:id_producto',
      name: 'productDetail',
      component: () => import('@/modules/products/productDetail.vue')
    },
    {
      beforeEnter: isAuthenicated,
      path: '/cart',
      name: 'cart',
      component: () => import('@/modules/Cart/cartView.vue')
    }
  ] 
})

export default router
