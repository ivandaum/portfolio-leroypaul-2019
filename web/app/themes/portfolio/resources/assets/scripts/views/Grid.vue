<template>
  <div class="Grid">
    <div class="Grid__titles">
      <p v-for="(project, i) in projects" :key="'grid-title-' + i" v-show="store.page == PAGES_NAME.grid">{{project.title}}</p>
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
import store from './../store/store';
import { PAGES_NAME } from './../utils/constants';

export default {
  name: 'Grid',
  data() {
      return {
        hovered: null,
        store: store,
        PAGES_NAME:PAGES_NAME
      }
  },
  props: {
    projects: Array,
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
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";
  .Grid {
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;

    &__titles {
      z-index: 5;
      position: relative;
    }

    &__picture {
      @include image-rotated();

      &.isActive {
        z-index: 2;
      }
    }
  }
</style>