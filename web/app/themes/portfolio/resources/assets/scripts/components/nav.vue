<template>
  <nav class="Nav">
    <router-link to="/">Home</router-link>
    <div class="Nav__right">
      <router-link to="/projects">All projects</router-link>
      <router-link to="/about">About</router-link>
    </div>
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
  @import "../../styles/conf/variables";

  .Nav {
    position: fixed;
    width: 100%;
    display: flex;
    padding: 100px 100px 0 100px;
    justify-content: space-between;
    top: 0;

    a {
      color: $white;
      font-weight: bold;
      text-decoration: none;
    }

    &__right {
      a:last-of-type {
        margin-left: 1em;
      }
    }
  }
</style>