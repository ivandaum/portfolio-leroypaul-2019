<template>
  <h2 class="SlidingTitle">{{title}}</h2>
</template>

<script>
export default {
  name: 'SlidingTitle',
  data() {
      return {
      }
  },
  props: {
    title: '',
  },
  mounted() {
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .SlidingTitle {
    font-size: 10rem;
    text-transform: uppercase;
    font-weight: bold;
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
  }
</style>