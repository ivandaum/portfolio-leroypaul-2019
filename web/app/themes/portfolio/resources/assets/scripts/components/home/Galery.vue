<template>
    <transition-group :name="'galery-picture' + direction()" class="Galery is-centered-container" :class="{'first-load': isFirstLoad}">
    <div class="Galery__picture"
      v-for="(project, i) in projects" 
      :key="'galery-image-' + i"
      v-show="current === i"
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
        $images: [],
        $pictures: [],
        PAGES_NAME: PAGES_NAME,
        imagesLoaded: 0,
        projects: [],
        isFirstLoad: true,
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
    }
  },
  mounted() {
    store.$on('init-galery', (projects) => {
      this.projects = projects;
      this.$nextTick(() => {
        
        const $picture = this.$el.querySelector('.Galery__picture');
        const pictureHeight = store.windowWidth * 0.31;
        const translate = store.windowHeight - pictureHeight * 0.5;

        this.galeryAnimation = anime({
          targets: $picture,
          duration: 1750,
          translateY: [translate, 0],
          translateX: [-translate * 0.5, 0],
          rotate: [-10, 10],
          easing: 'easeInOutQuart',
          autoplay: false,
          complete: () => {
            this.isFirstLoad = false;
            $picture.style.transform = '';
          }
        });
      });
    });

    store.$on('switch-project', (value) => {
      if (this.isFirstLoad) {
        this.galeryAnimation.play()
      }
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
      z-index: 1;
      display: block;
      position: absolute;
      pointer-events: none;
      transform: rotate(10deg);
      transform-origin: center center;
      @include size();

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
  .Galery.first-load .Galery__picture {
      transition: none !important;
    }
</style>