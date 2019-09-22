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
    store.$save({projects: window.PROJECTS});
    store.$emit('projectsLoaded');
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
