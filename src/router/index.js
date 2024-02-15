import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserListView'
import UserActive from '../views/UserActiveView'
import LoginView from '../views/LoginView'
import NotFound from '../views/NotFoundView'
import RegisterView from '../views/RegisterView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/useractive/:userId/',
    name: 'useractive',
    component: UserActive
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404/"
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
