<template>
  <div class="ActiveTitle is-centered-container is-absolute">
      <div class="ActiveTitle__number is-centered" :class="{active: showNumber()}">
        <div class="ActiveTitle__number--inner is-centered"
          v-for="(project, i) in projects" 
          :key="'active-title-number' + i" 
        >
          <transition :name="'title' + direction()">
            <span v-show="isActive(i) && showNumber()">{{ formatedIndex(i) }}</span>
          </transition>
        </div>
      </div>

      <div class="ActiveTitle__titles container-titles is-centered" @mouseenter="$emit('hover', true)" @mouseleave="$emit('hover', false)">
        <div class="ActiveTitle__title container-titles__title is-absolute"
          v-for="(project, i) in projects" 
          :key="'active-title' + i" 
        >
          <transition :name="'title' + direction()">
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
        PAGES_NAME: PAGES_NAME,
        isFirstLoad: true
      }
  },
  props: {
    current: Number,
    projects: Array
  },
  methods: {
    isActive(index) {
      if (store.page === PAGES_NAME.about || store.page === PAGES_NAME.grid) return false;
      
      return this.current === index;
    },
    direction() {
      return store.scrollDirection < 0 ? '-bottom' : '-top';
    },
    formatedIndex(index) {
      index += 1;
      return index < 10 ? '0' + index : index;
    },
    showNumber() {
      if (store.page === PAGES_NAME.home || store.page === PAGES_NAME.slug) {
        return !this.isFirstLoad;
      }

      return false;
    }
  },
  mounted() {
    store.$on('switch-project', (value) => {
      if (this.isFirstLoad) setTimeout(() => this.isFirstLoad = false, 1000);
    });
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
        height: 2rem;
        width: 100%;
        overflow:hidden;
        position: absolute;
      }
      
      &.active {
        opacity: 1;
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