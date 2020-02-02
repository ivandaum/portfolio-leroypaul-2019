<template>
  <div id="app" class="App" v-on:wheel="onScroll" v-on:scroll.native="onScroll">
    <Loader />
    <Nav />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import RafManager from './utils/RafManager';
import store from './store/store';
import { PAGES_NAME } from './utils/constants';
import normalize from 'normalize-wheel';
import Nav from './components/Nav.vue';
import Loader from './views/Loader.vue';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
    this.canScroll = true;
    this.raf = null;
    store.$emit('app-loaded');

    window.addEventListener('resize', this.onResize.bind(this));
  },
  watch:{
    $route (to, from) {
      store.page = this.$route.params.page;
      store.slug = this.$route.params.slug ? this.$route.params.slug : null;
    }
  },
  methods: {
    onScroll(e) {
      const scroll = normalize(e);

      if(store.page == PAGES_NAME.home) {
        this.onHomeScroll(scroll);
      }
    },
    onResize() {
      store.windowWidth = window.innerWidth;
      store.windowHeight =  window.innerHeight;
    },
    onHomeScroll(scroll) {
      if(!this.canScroll) return false;

      this.canScroll = false;
      const direction = scroll.spinY > 0 ? 1 : -1;
      const projectsCount = store.projects.length;
      let current = store.project + direction; 

      if(current > projectsCount - 1) {
        current = 0;
      } else if (current < 0) {
        current = projectsCount - 1;
      }

      store.project = current;
      store.scrollDirection = direction;

      store.$emit('switch-project', current);
      
      setTimeout( () => {
        this.canScroll = true;
      }, 2000);
    }
  },
  components: { 
    Nav,
    Loader,
  },
}
</script>
<style lang='scss'>
  .App {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
