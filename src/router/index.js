import Vue from 'vue'
import VueRouter from 'vue-router'
import Add from '../views/Add.vue'
import Error from '../views/Error.vue'
import Index from '../views/Index.vue'
import Search from '../views/Search.vue'
import Edit from "../views/Edit";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path:'/edit',
      name: 'Edit',
      component: Edit
    }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
