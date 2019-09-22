<template>
  <h2 class="ProjectTitle">{{title}}</h2>
</template>

<script>
export default {
  name: 'ProjectTitle',
  data() {
      return {}
  },
  prop: {
    title: String,
  },
  mounted() {
    
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .ProjectTitle {
    font-size: 5rem;
  }
</style>