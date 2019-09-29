import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';

import { PAGES_NAME } from '../utils/constants';

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
        to.params.grid = false;
        to.params.page = PAGES_NAME.home;
        next();
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: Home,
      beforeEnter: (to, from, next) => {
        to.params.grid = true;
        to.params.page = PAGES_NAME.grid;
        next();
      },
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: Home,
      beforeEnter: (to, from, next) => {
        to.params.page = PAGES_NAME.slug;
        next();
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: (to, from, next) => {
        to.params.page = PAGES_NAME.about;
        next();
      },
    },
  ],
});


export default router;
