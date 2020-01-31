<template>
  <div class="Galery is-centered-container">
    
    <div class="Galery__picture"
      v-for="(project, i) in projects" 
      :key="'galery-image-' + i"
      :style="{zIndex: projects.length - i}"
    >
      <img :src="project.preview_image.sizes.large"/>
    </div>
  </div>
</template>

<script>
import store from './../../store/store';
import { PAGES_NAME } from './../../utils/constants';
import anime from 'animejs';

export default {
  name:'Galery',
  data() {
      return {
        store: store,
        $images: [],
        zIndex: 1,
        PAGES_NAME: PAGES_NAME,
      }
  },
  props: {
    current: Number,
    projects: Array
  },
  methods: {
    switchPicture(index) {
      if (this.current === index) return false;

      const $image = this.$images[index];
      this.zIndex += 1;
      $image.style.zIndex = this.zIndex;
      anime({targets: $image.querySelector('img'), translateY: ['100%', '0'], duration: 1000, easing: 'easeInOutQuart'});
    }
  },
  mounted() {
    this.$images = Array.from(this.$el.querySelectorAll('.Galery__picture'));
    this.zIndex = this.$images.length;
    store.$on('switchProject', (value) => this.switchPicture(value));
  },
}
</script>
<style lang="scss">
  @import "../../../styles/conf/variables";
  @import "../../../styles/conf/mixins";
  .Galery {
    &__picture {
      @include image();
      z-index: 1;
    }
  }
</style>