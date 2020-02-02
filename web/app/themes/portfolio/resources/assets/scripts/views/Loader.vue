<template>
  <div class="Loader is-centered-container" v-show="showLoader">
    <div class="Loader__introduction">
      <span
        v-for="(letter, i) in 'Paul Leroy'"
        :key="'loader-letter-' + i"
        class="js-letter"
        v-html="letter === ' ' ? '&nbsp;' : letter"
      ></span> 
    </div>
    <div class="Loader__background js-background"></div>
  </div>
</template>
<script>
import Vue from 'vue';
import store from '../store/store';
import constants from '../utils/constants';
import anime from 'animejs';

export default {
  name: 'Loader',
  data() {
    return {
      showLoader: true
    }
  },
  mounted() {
    this.initAnimation();
    store.$on('app-loaded', () => {
      this.letterAnimation.play()
      this.$nextTick(() => setTimeout(() => this.loadDatas(), 0));
    });
  },
  methods: {
    loadDatas() {
      this.previewLoaded = 0;
      store.page = this.$route.params.page;
      store.slug = this.$route.params.slug ? this.$route.params.slug : null;
      store.windowWidth = window.innerWidth;
      store.windowHeight =  window.innerHeight;

      store.about = window.ABOUT;
      store.$emit('about-loaded');

      const projects = window.PROJECTS;
      store.$emit('init-galery', projects);

      store.$on('image-preview-loaded', () => {
        this.previewLoaded++;
        if(projects.length === this.previewLoaded) this.onProjectsLoaded(projects);
      });
    },
    onProjectsLoaded(projects) {
      store.projects = projects;
      store.$emit('projects-loaded');

      this.letterAnimation.reverse();
      this.letterAnimation.play();
      this.backgroundAnimation.play();

      this.$nextTick(() => {
        store.$emit('switch-project', 0)
      })
    },
    initAnimation() {
      this.letterAnimation = anime({
        targets: this.$el.querySelectorAll('.js-letter'),
        duration: 1000,
        translateY: ['100%', '0%'],
        easing: 'easeInOutQuart',
        delay: (el, i) => i * 25,
        autoplay: false
      });

      this.backgroundAnimation = anime({
        targets: this.$el.querySelector('.js-background'),
        duration: 1000,
        width: ['100%', '0%'],
        easing: 'easeInOutQuart',
        autoplay: false,
        delay: 300,
        complete: () => {
          this.showLoader = false;
        }
      });
    }
  },
  components: {
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf";

  .Loader {
    position: fixed !important;
    z-index: 400 !important;
    opacity: 0;

    &__introduction {
      height: 1.5rem;
      overflow: hidden;
    }

    &__introduction span {
      color: $brown;
      font-family: $font-title;
      position: relative;
      z-index: 400;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      display: inline-block;
    }

    &__background {
      display: block;
      position: absolute;
      background: $about-background;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>