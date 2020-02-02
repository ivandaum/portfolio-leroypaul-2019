<template>
  <div class="ActiveTitle is-centered-container is-absolute">
      <div class="ActiveTitle__number is-centered">
        <div class="ActiveTitle__number--inner is-centered"
          v-for="(project, i) in projects" 
          :key="'active-title-number' + i" 
          :class="{isActive: store.page === PAGES_NAME.home || store.page === PAGES_NAME.slug}"
        >
          <transition :name="'slide' + transitionDirection()">
            <span v-show="isActive(i)">{{ formatedIndex(i) }}</span>
          </transition>
        </div>
      </div>

      <div class="ActiveTitle__titles container-titles is-centered">
        <div class="ActiveTitle__title container-titles__title is-absolute"
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
import store from './../../store/store';
import SlidingTitle from '../../components/SlidingTitle.vue';
import { PAGES_NAME } from './../../utils/constants';

export default {
  name: 'ActiveTitle',
  data() {
      return {
        store: store,
        PAGES_NAME: PAGES_NAME
      }
  },
  props: {
    current: Number,
    projects: Array
  },
  methods: {
    isSectionActive() {
      return store.page === PAGES_NAME.home;
    },
    isActive(index) {
      if (store.page === PAGES_NAME.about || store.page === PAGES_NAME.grid) return false;
      
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
  @import "../../../styles/conf";

  .ActiveTitle {
    &__number {
      font-size: 2rem;
      font-family: $font-title;
      height: 8.5rem;
      width: 8.5rem;
      border: 0.2rem solid rgba($white, .5);
      border-radius: 50%;
      position: absolute;
      z-index: 10;
      margin-top: -#{$title-height};
      transition: opacity .5s;
      opacity: 0;

      @include tablet {
        margin-top: -#{$title-height * 2};
      }

      @include phone {
        margin-top: -#{$title-height * 3};
      }

      &--inner {
        height: 1.5rem;
        width: 100%;
        overflow:hidden;
        position: absolute;
      }
    }

    &__title {
      height: 100%;
      width: 100%;
      display: block;

      &:hover a {
        color: $white;
      }
    }

  }
</style>