import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../../firebase'

import Home from '../pages/Home'
import BadgesInfo from '../pages/BadgesInfo'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Post from '../pages/Post'
import Signup from '../pages/Signup'
import NotFound from '../components/404'

import Topic from '../pages/Topic/'
import TopicNew from '../pages/Topic/New'

import vClickOutside from 'v-click-outside'
import inViewportDirective from 'vue-in-viewport-directive'

Vue.directive('in-viewport', inViewportDirective)
Vue.use(vClickOutside)
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      forbidsAuth: true,
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      forbidsAuth: true,
    }
  },
  {
    path: '/profile/:uid',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/post/:post_uid',
    name: 'Post',
    component: Post,
  },
  {
    path: '/badgesinfo',
    name: 'BadgesInfo',
    component: BadgesInfo,
  },
  {
    path: '/t/:slug',
    name: 'Topic',
    component: Topic,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/topic/new',
    name: 'TopicNew',
    component: TopicNew,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
]

const router = new Router({
  routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(routes => routes.meta.requiresAuth)
  const forbidsAuth = to.matched.some(routes => routes.meta.forbidsAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  }
  // prevent logged-in users from accessing auth pages
  else if (forbidsAuth && auth.currentUser) {
    next('/')
  } else {
    next()
  }

})

export default router