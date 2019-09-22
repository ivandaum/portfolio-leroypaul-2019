/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';

// Vue.config.productionTip = false;
document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})