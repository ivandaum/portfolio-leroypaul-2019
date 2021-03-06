<template>
  <div class="About" v-show="isShown">
    <div class="About__title container-titles" @mouseenter="showPicture = true" @mouseleave="showPicture = false" v-if="titles.length">
      <transition :name="'title' + (this.isActive ? '-top' : '-bottom')">
        <SlidingTitle :slug="slugs" :title="titles" :isActive="showTitle" v-show="showTitle" />
      </transition>
    </div>
    <div class="container">
      <div class="About__content is-relative">
        <ul class="About__left">
          <li v-for="(network, i) in datas.social_networks" :key="'social-network' + i">
            <a :href="network.url" rel="noreferrer" target="_blank" class="is-relative js-network-in">{{network.name}}</a>
          </li>
          <div class="separator">
            <li class="question"><div class="js-network-in">Do you have any questions?</div></li>
            <li><a :href="'mailto:' + datas.email" rel="noreferrer" class="is-relative js-network-in">{{datas.email}}</a></li>
          </div>
          <div class="separator">
            <li><a :href="'http://ivandaum.fr'" rel="noreferrer" target="_blank" class="is-relative js-network-in">Code by Ivan Daum</a></li>
          </div>
        </ul>
        <div class="About__center is-relative" v-html="datas.description"></div>
      </div>
      <div class="About__picture">
        <transition :name="'profil-picture'">
          <ImageSource v-if="datas.picture" :image="datas.picture" :noratio="true" v-show="showPicture && isActive || store.windowWidth <= 768 && isActive " />
        </transition>
      </div>
    </div>
    <div class="About__background js-background"></div>
  </div>
</template>

<script>
import SlidingTitle from '../../components/SlidingTitle.vue';
import ImageSource from '../../components/ImageSource.vue';
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
        showPicture: false,
        isShown: false,
        picture: false,
      }
  },
  props: {
    datas: Object,
    isActive: Boolean
  },
  mounted() {
    this.titles = this.datas.title.split(' ');
    this.slugs = this.titles.map(() => null);

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
      });
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
        this.isShown = true;
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
        setTimeout(() => {
          this.isShown = false;
        }, 1200);
      }
    }
  },
  components: {
    SlidingTitle,
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf";

  .About {
    height: 100vh;
    width: 100%;
    padding-top: 20rem;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 200;

    @include phone {
      overflow-y: scroll;
      padding: 10rem 0;
    }

    &__title {
      margin-bottom: 10rem;

      @include touch {
        margin-bottom: 7rem;
      }

      a b {
        color: $about-title;
        @include no-text-border;
      }

      a {
        @include text-border($greige);
      }

      .SlidingTitle {
        pointer-events: none;
      }
    }

    &__background {
      display: block;
      position: fixed;
      background: $about-background;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      z-index: 1;
    }

    &__content  {
      z-index: 10;
      display: flex;

      @include phone {
        flex-wrap: wrap;
        flex-direction: column-reverse;
      }
    }

    &__left,
    &__center {
      width: 38rem;
      @include phone {
        width: 100%;
      }

      a {
        text-decoration: none;
        display: inline-block;
        font-weight: bold;
        color: inherit;
        position: relative;
        @include link-border;
      }
    }

    &__left {
      list-style: none;
      padding-right: 20rem;
      @include phone {
        padding-right: 0;
        display: flex;
        flex-wrap: wrap;
      }

      li {
        color: $brown;
        font-size: 1.4rem;
        height: 2.8rem;
        padding-top: 1rem;
        overflow: hidden;
        display: block;

        @include phone {
          width: 30%;
        }
      }

      .separator {
        margin-top: 2rem;
        @include phone {
          width: 50%;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;

          li {
            width: 100%;
          }
        }

        &:nth-of-type(2) {
          @include phone {
            text-align: right;
          }
        }

        li:last-child {
          margin-top: -0.5rem;
        }
      }

      .question {
        overflow: none;
        @include touch {
          height: 5rem;
        }
      }

      a:after {
        transition: width .2s $cbezier1;
      }

      a:hover:after {
        @include desktop {
          width: 0;
          animation: none;
        }
      }

    }

    &__center {
      color: $greige;
      @include desktop {
        width: 64rem;
      }

      p {
        margin: 0 0 10px 0;
        font-size: 24px;
        line-height: 40px;
        @include touch {
          font-size: 20px;
          line-height: 34px;
        }
        &:first-child {
          color: $brown;
          font-size: 24px;
        }
      }

      a {
        line-height: 24px;
        color: $brown;
        font-weight: normal;
      }

      a::after {
        height: 2px;
      }
    }

    &__picture {
      position: absolute;
      z-index: 10;
      top: -19.5rem;
      right: 10%;
      pointer-events: none;
      
      picture {
        display: block;
        transform: rotate(5deg);
      }

      @include phone {
        position: relative;
        top: 0;
        right: auto;
        left: 0;
        width: 100%;
        pointer-events: auto;
        margin: 5rem 0;
        img {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
