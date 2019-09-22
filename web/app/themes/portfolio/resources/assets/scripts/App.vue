<template>
  <div id="app" class="App">
    <Nav />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Nav from './components/Nav.vue';
import store from './store/store';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
    store.$save({
      projects: window.PROJECTS,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
    store.$emit('projectsLoaded');

    this.raf = null;
    this.render();
  },
  methods: {
    render() {
      this.raf = window.requestAnimationFrame(this.render.bind(this))
      store.$emit('render');
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
