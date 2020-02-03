<template>
  <div class="Galery" :class="{full: isFull}">
    <div class="Galery__picture-container is-absolute is-centered-container" v-for="(project, index) in projects" :key="'galery-image-' + index">
      <transition :name="'galery-picture' + direction()">
        <ImageSource v-show="current === index" @loaded="onImageLoad" :image="project.preview_image" />
      </transition>
    </div>
  </div>
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
    isFull: Boolean
  },
  methods: {
    onImageLoad() {
      store.$emit('image-preview-loaded');
    },
    direction() {
      return store.scrollDirection < 0 ? '-bottom' : '-top';
    }
  },
  mounted() {
    store.$on('init-galery', projects => {
      this.projects = projects;
      this.activeImage = this.current;
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
    &__picture-container {
      width: 100%;
      height: 100%;
    }

    picture {
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

    picture:not([class*="galery-picture-"]) {
      transition: width $easing $cbezier1, height $easing $cbezier1;
    }

    img {
      position: absolute;
      object-fit: cover;
      display: block;
      height: 100%;
      width: 100%;
    }

    &.full picture {
      width: 100%;
      height: 100%;
    }
  }
</style>