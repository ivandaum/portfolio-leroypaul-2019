import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Project from '../views/Project.vue';
import About from '../views/About.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: Home,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: Project,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: (to, from, next) => {
        next();
      },
    },
  ],
});


export default router;
