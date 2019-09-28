<template>
  <div class="Grid">
    <div class="Grid__titles">
      <p></p>
    </div>
    <div class="Grid__picture" 
      v-for="(project, i) in projects" 
      :key="'grid-image-' + i" 
      :class="{isActive: isHovered(i)}"
    >
      <transition name="picture-slide-in" >
        <img :src="project.preview_image.sizes.large" v-show="isHovered(i)" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  data() {
      return {
        hovered: null
      }
  },
  props: {
    projects: Array,
    isGrid: Boolean,
    current: Number
  },
  mounted() {
  },
  methods: {
    isHovered(index) {
      if(this.hovered === null) {
        return this.current === index;
      }

      return this.hovered === index;
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/mixins";
  .Grid {
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;

    &__picture {
      @include image-rotated();

      &.isActive {
        z-index: 2;
      }
    }
  }
</style>