<template>
  <div class="Galery is-centered-container" :class="{'no-easing': isFirstLoad}">
    <div class="Galery__picture"
      v-for="(project, i) in projects" 
      :key="'galery-image-' + i"
      :style="{zIndex: projects.length - i}"
    >
      <ImageSource @loaded="onImageLoad" :image="project.preview_image" />
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
        $images: [],
        $pictures: [],
        zIndex: 1,
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
    switchPicture(index, instant) {
      if (this.current === index) return false;

      const $image = this.$images[index];
      const $picture = this.$pictures[index];
      this.zIndex += 1;
      $image.style.zIndex = this.zIndex;

      if (instant) {
        $picture.style.transform = 'translateY(0)';
      } else {
        anime({targets: $picture, translateY: ['100%', '0'], duration: 1000, easing: 'easeInOutQuart'});
      }
    }
  },
  mounted() {
    store.$on('init-galery', (projects) => {
      this.projects = projects;
      this.$nextTick(() => {
        this.$images = Array.from(this.$el.querySelectorAll('.Galery__picture'));
        this.$pictures = Array.from(this.$el.querySelectorAll('.Galery__picture picture'));
        this.zIndex = this.$images.length;
        
        this.galeryAnimation = anime({
          targets: this.$images.map($image => $image),
          duration: 1000,
          translateY: [store.windowHeight, 0],
          translateX: [-store.windowHeight*0.18, 0],
          rotate: ['10deg'],
          easing: 'easeInOutQuart',
          delay: (el, i) => i * -100,
          autoplay: false,
          complete: () => this.isFirstLoad = false
        });
      });
    });

    store.$on('switch-project', (value) => {
      if (this.isFirstLoad) {
        this.switchPicture(value, true);
        setTimeout(() => this.galeryAnimation.play(), 500);
      } else {
        this.switchPicture(value);
      }
    });
  },
  components: {
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf/variables";
  @import "../../../styles/conf/mixins";
  .Galery {
    &__picture {
      @include image();
      z-index: 1;
      display: block;
    }

    picture {
      display: block;
      width: 100%;
      height: 100%;
    }

    &.no-easing .Galery__picture {
      transition: none !important;
    }
  }
</style>