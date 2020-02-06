<template>
  <div class="Galery" :class="{full: isFull && !store.projectScrolled}">
    <div class="Galery__picture-container is-absolute" v-for="(project, index) in projects" :key="'galery-image-' + index">
      <transition :name="'galery-picture' + direction()">
        <div class="Galery__picture is-centered-container" :class="{isActiveProjectCover: store.isProjectOpen(project.slug)}" v-show="current === index">
        <ImageSource @loaded="onImageLoad" :ratio="ratio" :here="ratio[0]" :image="project.preview_image" :isPreview="true" />
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
        ratio: [1, 1]
      }
  },
  props: {
    current: Number,
    isFull: Boolean,
  },
  methods: {
    onImageLoad() {
      store.$emit('image-preview-loaded');
    },
    direction() {
      return store.scrollDirection < 0 ? '-bottom' : '-top';
    },
    calcRatio() {
      const ratioY = 0.51;
      const ratioWindow = store.windowHeight / store.windowWidth;

      let ratioX = (ratioWindow * ratioY) * 0.81;
      if (ratioWindow >= 1.5) {
        ratioX = 0.6;
      }

      this.$set(this.ratio, 1, ratioY);
      this.$set(this.ratio, 0, ratioX);
    }
  },
  mounted() {
    store.$on('init-galery', projects => {
      this.projects = projects;
      this.activeImage = this.current;
      this.calcRatio();
    });

    window.addEventListener('resize', this.calcRatio.bind(this));
  },
  components: {
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf";

  .Galery {
    height: 100vh;
    width: 100%;
    transform-origin: center center;
    position: relative;
    pointer-events: none;

    @include phone {
      height: 90vh; // fix native menu overlaps
    }

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
    }

    img {
      position: absolute;
      display: block;
      object-fit: cover;
      height: 100% !important;
      width: 100% !important;
      transition-duration: $easing * 1.2;
    }

    &.full .Galery__picture {
      transition: none;
    }
    &.full picture {
      transform: scale(1) !important;
      transition-delay: $easing / 4;

      img {
        transform: scale(1) translateY(-15vh) !important;
      }
    }

    @include image();
  }
</style>