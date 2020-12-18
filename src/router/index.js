import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
		path: '/login',
		name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false }
  },
  {
		path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
		path: '/search',
		name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
		name: 'article',
    component: () => import('@/views/article/'),
    meta: { requiresAuth: false },
    props: true
  },
  {
		path: '/user/profile',
		name: 'user-profile',
    component: () => import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
		path: '/user/chat',
		name: 'user-chat',
    component: () => import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果已经登录，则直接通过
  if (store.state.user) {
    return next()
  } else {
    // 判断页面是否需要登录才能访问
    if (to.meta.requiresAuth) {
      Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录才能访问，确认登录吗'
      }).then(() => {
          router.replace({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
      }).catch(() => {
        // on cancel
        // 中断路由
        next(false)
      })
    } else {
      return next()
    }
  }
})

export default router
