<template>
  <div class="ActiveTitle is-centered-container is-absolute">
      <div class="ActiveTitle__number is-centered">
        <div class="ActiveTitle__number--inner is-centered"
          v-for="(project, i) in projects" 
          :key="'active-title-number' + i" 
          :class="{isActive: isActive(i)}"
        >
          <transition :name="'slide' + transitionDirection()">
            <span v-show="isActive(i)">{{ formatedIndex(i) }}</span>
          </transition>
        </div>
      </div>

      <div class="ActiveTitle__titles is-centered">
        <div class="ActiveTitle__title is-absolute"
          v-for="(project, i) in projects" 
          :key="'active-title' + i" 
        >
          <transition :name="'slide' + transitionDirection()">
            <SlidingTitle :slug="project.slug" :title="project.title" :isActive="isActive(i)" v-show="isActive(i)" />
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import store from './../store/store';
import SlidingTitle from '../components/SlidingTitle.vue';

export default {
  name: 'ActiveTitle',
  data() {
      return {}
  },
  props: {
    current: Number,
    projects: Array
  },
  methods: {
    isActive(index) {
      return this.current === index;
    },
    transitionDirection() {
      if(store.scrollDirection < 0) return '-bottom';

      return '-top';
    },
    formatedIndex(index) {
      index += 1;
      return index < 10 ? '0' + index : index;
    }
  },
  mounted() {
    
  },
  components: {
    SlidingTitle
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .ActiveTitle {
    &__number {
      font-size: 1.25rem;
      font-family: $font-title;
      height: 5.3125rem;
      width: 5.3125rem;
      border: 2px solid rgba($white, .5);
      border-radius: 50%;
      position: absolute;
      z-index: 10;
      margin-top: -#{$title-height * 0.75};
      transition: opacity .5s;

      &--inner {
        height: 1.5rem;
        width: 3rem;
        overflow:hidden;
        position: absolute;
      }
    }

    &__titles {
      height: $title-height;
      width: 100%;
      position: relative;
      z-index: 10;
    }

    &__title {
      height: 100%;
      width: 100%;
      font-size: 8.5vw;
      text-transform: uppercase;
      display: block;
      overflow: hidden;

      &:hover .SlidingTitle a {
        color: $white;
      }
    }
  }
</style>