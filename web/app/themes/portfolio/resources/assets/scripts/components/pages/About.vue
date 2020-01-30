<template>
  <div class="About">
    <div class="About__title container-titles" v-if="titles.length">
      <transition :name="'slide' + transitionDirection()">
        <SlidingTitle :slug="slugs" :title="titles" :isActive="showTitle" v-show="showTitle" />
      </transition>
    </div>

    <div class="About__left">

    </div>

    <div class="About__background js-background"></div>
  </div>
</template>

<script>
import SlidingTitle from '../../components/SlidingTitle.vue';
import store from '../../store/store';
import { PAGES_NAME } from './../../utils/constants';
import anime from 'animejs';

export default {
  name: 'About',
  data() {
      return {
        titles: [],
        slugs: [],
        store: store,
        PAGES_NAME: PAGES_NAME,
        showTitle: false,
      }
  },
  props: {
    datas: Object,
    isActive: Boolean
  },
  mounted() {
    this.$nextTick(() => {
      this.titles = this.datas.title.split(' ');
      this.slugs = this.titles.map(() => null);
      this.createTimeline();

      if (this.isActive) {
        this.show();
      }
    });
  },
  watch: {
    isActive(to) {
      to ? this.show() : this.hide();
    }
  },
  methods: {
    transitionDirection() {
      return this.isActive ? '-top' : '-bottom';
    },
    createTimeline() {
      this.$background = this.$el.querySelector('.js-background');
      this.animation = anime.timeline({autoplay: false});
      this.animation
      .add({
        targets: this.$background,
        duration: 1000,
        width: ['0%', '100%'],
        easing: 'easeInOutQuart',
        complete: () => {
          if (!this.animation.reversed) {
            this.showTitle = this.isActive;
          }
        },
        begin: () => {
          if (this.animation.reversed) {
            this.showTitle = this.isActive;
          }
        }
      })
    },
    show() {
      if (this.animation.reversed) {
        this.animation.reverse();
      }
      setTimeout(() => this.animation.play(), 200);
    },
    hide() {
      if (!this.animation.reversed) {
        this.animation.reverse();
      }
      this.animation.play();
    }
  },
  components: {
    SlidingTitle
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf/variables";
  @import "../../../styles/conf/mixins";

  .About {
    min-height: 100vh;
    width: 100%;
    padding-top: 12.5rem;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 200;
    pointer-events: none;

    &__title a:nth-of-type(1),
    &__title a:nth-of-type(2) {
      color: $about-title;
      @include no-text-border;
    }

    &__title a {
      @include text-border($greige);
    }

    &__background {
      display: block;
      position: absolute;
      background: $about-background;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
    }
  }
</style>