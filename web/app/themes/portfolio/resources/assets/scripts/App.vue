<template>
  <div id="app" class="App" v-on:wheel="onScroll" v-on:scroll.native="onScroll">
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

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
    this.canScroll = true;
    this.raf = null;

    store.projects = window.PROJECTS;
    store.about = window.ABOUT;
    store.page = this.$route.params.page;
    store.slug = this.$route.params.slug ? this.$route.params.slug : null;
    store.windowWidth = window.innerWidth;
    store.windowHeight =  window.innerHeight;

    this.$nextTick(() => {
      setTimeout( () => {
        store.$emit('projectsLoaded');
        store.$emit('aboutLoaded');
        store.$emit('switchProject', 0);
      }, 200);
    });
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

      store.$emit('switchProject', current);
      
      setTimeout( () => {
        this.canScroll = true;
      }, 2000);
    }
  },
  components: { 
    Nav, 
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
