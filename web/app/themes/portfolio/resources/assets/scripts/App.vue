<template>
  <div id="app" class="App">
    <Home />
  </div>
</template>
<script>
import Home from './views/Home.vue';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted () {
  },
  components: { 
    Home, 
  },
}
</script>
<style lang='scss'>
  .App {
    height: 100vh;
  }
</style>
