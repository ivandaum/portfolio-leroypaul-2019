<template>
    <transition-group :name="'galery-picture-top'" class="Galery is-centered-container">
      <div class="Galery__picture"
        v-for="(project, i) in projects" 
        :key="'galery-image-' + i"
        v-show="isActive(i)"
      >
        <ImageSource @loaded="onImageLoad" :image="project.preview_image" />
      </div>
    </transition-group>
</template>

<script>
import ImageSource from '../../components/ImageSource.vue';
import store from './../../store/store';
import { PAGES_NAME } from './../../utils/constants';
import anime from 'animejs';

export default {
  name: 'Galery',
  data() {
      return {
        store: store,
        PAGES_NAME: PAGES_NAME,
        projects: [],
      }
  },
  props: {
    current: Number,
  },
  methods: {
    onImageLoad() {
      store.$emit('image-preview-loaded');
    },
    direction() {
      return store.scrollDirection < 0 ? '-bottom' : '-top';
    },
    isActive(index) {
      return this.current === index;
    }
  },
  mounted() {
    store.$on('init-galery', (projects) => {
      this.projects = projects;
    });
  },
  components: {
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf";

  @mixin size($ratio: 1) {
    width: image-width($ratio);
    height: image-height($ratio);
  }

  .Galery {
    &__picture {
      @include size();
      z-index: 1;
      display: block;
      position: absolute;
      transform-origin: center center;

      @include tablet {
        @include size(2);
      }

      @include phone {
        @include size(3);
      }
    }

    &__picture:not([class*="galery-picture-"]) {
      transition: transform $easing;
    }

    picture {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      position: absolute;
      object-fit: cover;
      display: block;
      height: 100%;
      width: 100%;
    }
  }
</style>