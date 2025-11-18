import { createRouter, createWebHistory } from 'vue-router'
 import Home from '../views/Home.vue'
 import BookList from '../components/BookList'
 import Auth from '../components/Auth'
 import Register from '../components/Register'

 
const routes = [
   {
     path: '/',
     name: 'Home',
     component: Home
   },
   {
     path: '/book-list',
     name: 'BookList',
     component: BookList,
   },
   {
     path:'/auth',
     name:'Auth',
     component: Auth
   },
   {
     path:'/register',
     name: 'Register',
     component: Register
   }


 ]
 
const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
 })
 
export default router

