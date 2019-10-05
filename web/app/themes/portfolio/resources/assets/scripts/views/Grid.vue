<template>
  <div class="Grid" v-if="titles">
    <div class="Grid__titles" v-for="i in 4" :key="'grid-title' + i">
        <transition :name="'slide-top'">
          <SlidingTitle @hover="onHover" :scroll="i % 2 == 0 ? 1 : -1" :start="i * 1000" :slug="slugs" :title="titles" :isActive="isGridActive()" v-show="isGridActive()" />
        </transition>
    </div>
    <div class="Grid__picture"
      v-for="(project, i) in projects" 
      :key="'grid-image-' + i" 
      :class="{isActive: isHovered(i)}"
    >
      <transition name="picture-slide-top" >
        <img :src="project.preview_image.sizes.large" v-show="isHovered(i)" />
      </transition>
    </div>
  </div>
</template>

<script>
import store from './../store/store';
import { PAGES_NAME } from './../utils/constants';
import SlidingTitle from '../components/SlidingTitle.vue';

export default {
  name: 'Grid',
  data() {
      return {
        hovered: null,
        titles: [],
        slugs: [],
        projects: []
      }
  },
  props: {
    current: Number
  },
  mounted() {
    store.$on('projectsLoaded', () => {
      this.projects = store.projects;
      for(let i = 0; i < this.projects.length; i++) {
        this.titles.push(this.projects[i].title);
        this.slugs.push(this.projects[i].slug);
      }
    });
  },
  watch:{
    $route (to, from) {
      if(from.name === PAGES_NAME.grid) {
        this.hovered = null;
      }
    }
  },
  methods: {
    isGridActive() {
      return store.page == PAGES_NAME.grid
    },
    onHover(data) {
      for(let i = 0; i < this.projects.length; i++) {
        if(data.slug === this.projects[i].slug) {
          store.$emit('switchProject', i);
          this.hovered = i;
          break;
        }
      }
    },
    isHovered(index) {
      if(this.hovered === null) {
        return this.current === index;
      }

      return this.hovered === index;
    },
  },
  components: {
    SlidingTitle
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";
  .Grid {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: relative;
    z-index: 1;

    &__titles {
      height: $title-height;
      max-height:15vh;
      font-size: 120px;
      text-transform: uppercase;
      width: 100%;
      display: block;
      overflow: hidden;
      position: relative;

      a {
        z-index: 5;
      }
      a:hover {
        color: $white;
        z-index: 20;
      }

      a:nth-of-type(even):not(:hover) {
        color: rgba($white, .3);
      }
    }

    &__picture {
      @include image-rotated();
      z-index: 10;
      &.isActive {
        z-index: 15;
      }
    }
  }
</style>