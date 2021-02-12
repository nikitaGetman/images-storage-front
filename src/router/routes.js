import { DASHBOARD_ROUTE_NAME, LOGIN_ROUTE_NAME, SIGNUP_ROUTE_NAME } from '@/constants/routes'
import { checkAuth, checkNonAuth, loadProfile } from './middleware'

export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'dashboard-layout' */ '@/layouts/Dashboard.vue'),
    meta: {
      middleware: [checkAuth, loadProfile]
    },
    redirect: { name: DASHBOARD_ROUTE_NAME },
    children: [
      {
        path: '',
        name: DASHBOARD_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/Dashboard.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: 'auth-layout' */ '@/layouts/Auth.vue'),
    meta: {
      middleware: [checkNonAuth]
    },
    redirect: LOGIN_ROUTE_NAME,
    children: [
      {
        path: '/auth/login',
        name: LOGIN_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'login' */ '@/views/Login.vue')
      },
      {
        path: '/auth/signup',
        name: SIGNUP_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'signup' */ '@/views/Signup.vue')
      }
    ]
  }
]
