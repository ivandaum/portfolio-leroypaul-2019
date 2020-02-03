<template>
  <div class="Galery" :class="{full: isFull, 'on-title-hover': titleIsHovered}">
    <div class="Galery__picture-container is-absolute" v-for="(project, index) in projects" :key="'galery-image-' + index">
      <transition :name="'galery-picture' + direction()">
        <div class="Galery__picture is-centered-container" v-show="current === index">
        <ImageSource @loaded="onImageLoad" :image="project.preview_image" />
        </div>
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
    isFull: Boolean,
    titleIsHovered: Boolean
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

  @mixin size($x: 1, $y: 1) {
    $width: image-width($x);
    $height: image-height($y);

    transform: scale($width, $height);
    img {
      transform: scaleX(1 / $width * 0.8) scaleY(1 / $height * 0.8);
    }
  }

  .Galery {
    &__picture-container {
      width: 100%;
      height: 100%;
      transform-origin: center center;
    }

    &__picture {
      transform-origin: center center;
      width: 100%;
      height: 100%;
      position: relative;
    }

    img,
    picture {
      transition: transform $easing ease;
    }

    picture {
      z-index: 1;
      display: block;
      transform-origin: center center;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      transition-delay: 0s;

      @include desktop {
        @include size(1.3);
      }

      @include tablet {
        @include size(1.5);
      }

      @include phone {
        @include size(1.8);
      }
    }

    &.on-title-hover picture {
      @include desktop {
        @include size(1.7, 1.3);
      }
    }

    img {
      position: absolute;
      display: block;
      object-fit: cover;
      height: 100%;
      width: 100%;
      transition-duration: $easing * 1.2;
    }

    &.full .Galery__picture {
      transition: none;
    }

    &.full picture {
      transform: scale(1);
      transition-delay: $easing / 4;

      img {
        transform: scale(1) translateY(-15vh);
      }
    }
  }
</style>