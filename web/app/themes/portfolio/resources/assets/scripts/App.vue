<template>
  <div id="app" class="App" v-on:wheel="onScroll" v-on:scroll.native="onScroll">
    <Nav />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Nav from './components/Nav.vue';
import store from './store/store';
import normalize from 'normalize-wheel';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
    this.canScroll = true;

    store.$save({
      projects: window.PROJECTS,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentProject: 0
    });
    store.$emit('projectsLoaded');
    this.raf = null;

    this.$nextTick(() => {
      setTimeout( () => {
        store.$save({currentProject: 0});
        store.$emit('switchProject', 0);
        this.render();
      }, 200);
    })
  },
  methods: {
    render() {
      this.raf = window.requestAnimationFrame(this.render.bind(this))
      store.$emit('render');
    },
    onScroll(e) {
      if(!this.canScroll) return false;

      this.canScroll = false;

      const scroll = normalize(e);
      const direction = scroll.spinY > 0 ? 1 : -1;
      const projectsCount = store.$get('projects').length;
      let current = store.project + direction; 

      if(current > projectsCount - 1) {
        current = 0;
      } else if (current < 0) {
        current = projectsCount - 1;
      }

      store.project = current
      store.scrollDirection = direction

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
  }
</style>
