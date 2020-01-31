<template>
  <div class="About">
    <div class="About__title container-titles" v-if="titles.length">
      <transition :name="'slide' + (this.isActive ? '-top' : '-bottom')">
        <SlidingTitle :slug="slugs" :title="titles" :isActive="showTitle" v-show="showTitle" />
      </transition>
    </div>

    <div class="About__content container is-relative">
      <ul class="About__left">
        <li v-for="(network, i) in networks" :key="'social-network' + i">
          <a :href="network.url" target="_blank" class="is-relative js-network-in">{{network.name}}</a>
        </li>

        <li class="separator"><div class="js-network-in">Do you have any question?</div></li>
        <li><a :href="'mailto:' + email" class="is-relative js-network-in">{{email}}</a></li>
        <li class="separator"><a :href="'http://twitter.com/ivndn'" target="_blank" class="is-relative js-network-in">Code by Ivan Daum</a></li>
      </ul>
      <div class="About__center is-relative" v-html="description"></div>
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
        networks: [],
        email: '',
        description: '',
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
    console.log(this.datas);
    this.titles = this.datas.title.split(' ');
    this.slugs = this.titles.map(() => null);
    this.networks = this.datas.social_networks;
    this.description = this.datas.description;
    this.email = this.datas.email;

    this.$nextTick(() => {
      this.initAnimation();

      if (this.isActive) {
        this.toggle();
      }
    });
  },
  watch: {
    isActive(to) {
      this.toggle();
    }
  },
  methods: {
    initAnimation() {
      this.$slideIn = this.$el.querySelectorAll('.js-network-in');
      this.$textIn = this.$el.querySelectorAll('.js-text-in');
      this.$background = this.$el.querySelector('.js-background');

      this.backgroundAnimation = anime({
        targets: this.$background,
        duration: 1000,
        width: ['0', '100%'],
        easing: 'easeInOutQuart',
        autoplay: false
      });

      this.networkAnimation = anime({
        targets: this.$slideIn,
        translateY: ['100%', '0%'],
        duration: 500,
        delay: (el, i) => i * 50,
        easing: 'easeInOutQuart',
        autoplay: false
      });

      this.textAnimation = anime({
        targets: this.$textIn,
        opacity: [0, 1],
        duration: 300,
        delay: (el, i) => i * 10,
        easing: 'linear',
        autoplay: false
      })
    },

    toggle() {
      if (!this.isActive && !this.backgroundAnimation.reversed
        || this.isActive && this.backgroundAnimation.reversed
      ) {
        this.backgroundAnimation.reverse();
        this.networkAnimation.reverse();
        this.textAnimation.reverse();
      }

      // show 
      if (this.isActive) {
        this.backgroundAnimation.play();

        setTimeout(() => {
          this.showTitle = true;
          this.networkAnimation.play();
          this.textAnimation.play();
        }, 500)
      } 
      // hide
      else {
        this.networkAnimation.play();
        this.textAnimation.play();
        this.showTitle = false;

        setTimeout(() => {
          this.backgroundAnimation.play();
        }, 200)
      }
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

    &__title {
      margin-bottom: 160px;
      a b {
        color: $about-title;
        @include no-text-border;
      }

      a {
        @include text-border($greige);
        pointer-events: none;
      }
    }

    &__background {
      display: block;
      position: absolute;
      background: $about-background;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      z-index: 1;
    }

    &__content  {
      z-index: 2;
      display: flex;
    }

    &__left,
    &__center {
      width: 360px;

      a {
        text-decoration: none;
        display: inline-block;
        font-weight: bold;
        color: inherit;
        position: relative;
      }

      a::after {
        content:" ";
        width: 100%;
        height: 1px;
        background: $brown;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    &__left {
      list-style: none;
      padding-right: 200px;

      li {
        color: $brown;
        font-size: 12px;
        height: 25px;
        padding-top: 10px;
        overflow: hidden;
        display: block;
      }

      li.separator {
        margin-top: 20px;
        margin-bottom: -5px;
      }
    }

    &__center {
      color: $greige;

      p {
        margin: 0 0 10px 0;
        font-size: 20px;
        line-height: 34px;

        &:first-child {
          color: $brown;
          font-size: 24px;
        }
      }

      a {
        line-height: 24px;
      }

      a::after {
        height: 2px;
      }
    }
  }
</style>