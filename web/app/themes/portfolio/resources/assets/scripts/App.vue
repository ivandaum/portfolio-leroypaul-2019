<template>
  <div id="app" class="App">
    <Nav />
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from './components/Nav.vue';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
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
