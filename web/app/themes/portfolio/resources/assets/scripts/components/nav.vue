<template>
  <nav class="Nav">
    <router-link to="/">Home</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/about">About</router-link>
  </Nav>
</template>

<script>
export default {
  name:'Nav',
  data() {
      return {}
  },
  mounted() {
    
  },
}
</script>
<style lang="scss">
  .Nav {
    
  }
</style>