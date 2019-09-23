<template>
  <div class="About">
    About
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
      return {}
  },
  mounted() {
    console.log('About mounted');
  },
}
</script>
<style lang="scss">
  .About {
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
  }
</style>