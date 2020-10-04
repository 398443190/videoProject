import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CourseCrud from '../views/Courses/ResourceCrud.vue'
// import CourseList from '../views/Courses/CourseList.vue'
// import CourseEdit from '../views/Courses/CourseEdit.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'CourseCrud', path: '/:resource/list', component: CourseCrud, props: true }
      // { name: 'Course-list', path: '/courses/list', component: CourseList },
      // { name: 'Course-edit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      // { name: 'Course-create', path: '/courses/create', component: CourseEdit }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
