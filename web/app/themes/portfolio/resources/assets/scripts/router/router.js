import Vue from 'vue';
import Router from 'vue-router';

import Index from '../views/Index.vue';
import { scrollTo } from '../utils/functions';
import store from '../store/store';
import { PAGES_NAME } from '../utils/constants';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Index,
      beforeEnter: (to, from, next) => {
        if (from.params.page ===  PAGES_NAME.slug && store.$scrollContainer.scrollTop > 0) {
          scrollTo(0, () => {
            to.params.grid = false;
            to.params.page = PAGES_NAME.home;
            next();
          });
        } else {
          to.params.grid = false;
          to.params.page = PAGES_NAME.home;
          next();
        }
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: Index,
      beforeEnter: (to, from, next) => {
        to.params.grid = true;
        to.params.page = PAGES_NAME.grid;
        next();
      },
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: Index,
      beforeEnter: (to, from, next) => {
        to.params.page = PAGES_NAME.slug;
        next();
      }
    },
    {
      path: '/about',
      name: 'about',
      component: Index,
      beforeEnter: (to, from, next) => {
        to.params.page = PAGES_NAME.about;
        next();
      },
    },
  ],
});

export default router;
