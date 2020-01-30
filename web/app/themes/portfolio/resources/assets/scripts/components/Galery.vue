<template>
  <div class="Galery is-centered-container">
    <div class="Galery__picture"
      v-for="(project, i) in projects" 
      :key="'galery-image-' + i" 
      :class="{isActive: isActive(i)}"
    >
      <img :src="project.preview_image.sizes.large" v-show="isActive(i)" />
    </div>
  </div>
</template>

<script>
import store from './../store/store';

export default {
  name:'Galery',
  data() {
      return {
        store: store
      }
  },
  props: {
    current: Number,
    projects: Array
  },
  methods: {
    isActive(index) {
      return this.current === index;
    },
  },
  mounted() {
    
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .Galery {
    &__picture {
      @include image();

      z-index: 10;

      &.isActive {
        z-index: 15;
      }
    }
  }
</style>