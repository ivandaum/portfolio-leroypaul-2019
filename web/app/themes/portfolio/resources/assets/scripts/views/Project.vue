<template>
  <div class="Project" :class="{isActive: isActive, isOpen: isOpen}">
    <div class="Project__header">
      <div class="Project__number">
        <div class="Project__number--inner">
          <transition :name="'slide' + transitionDirection()">
            <span v-show="showHeader()">{{ formatedIndex() }}</span>
          </transition>
        </div>
      </div>

      <div class="Project__title" >
        <transition :name="'slide' + transitionDirection()">
          <SlidingTitle :slug="data.slug" :title="data.title" :isActive="showHeader()" v-show="showHeader()" />
        </transition>
      </div>

      <div class="Project__picture">
        <transition :name="'picture-slide' + transitionDirection()">
          <img :src="data.preview_image.sizes.large" v-show="showHeader()"/>
        </transition>

      </div>
    </div>
    <div class="Project__inner">
      <div class="Project__info container">
        <div class="Project__info--left">
          <div v-if="data.client">
            <strong>Client</strong>
            <p>{{data.client}}</p>
          </div>
          <div v-if="data.date">
            <strong>Date</strong>
            <p>{{data.date}}</p>
          </div>
          <div v-if="data.project_url.length">
            <a :href="url" v-for="(url, name) in data.project_url" :key="name">Voir sur {{name}}</a>
          </div>
        </div>
        <div class="Project__info--right">
          <strong v-if="data.subtitle">{{data.subtitle}}</strong>
          <div v-if="data.description">{{data.description}}</div>
        </div>
      </div>
      <div class="Project__pictures">
        <div v-for="(img, i) in data.content" :key="i" :class="{container: img.type == 'center', 'container-fluid': img.type == 'full' }">
          <img :width="img.width" :height="img.height" :src="img.url" :alt="data.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlidingTitle from '../components/SlidingTitle.vue';
import store from '../store/store';
import { PAGES_NAME } from './../utils/constants';

export default {
  name: 'Project',
  data() {
    return {
      store: store
    }
  },
  props: {
    data: Object,
    isOpen: Boolean,
    isActive: Boolean,
    index: Number,
  },
  updated() {
  },
  methods: {
    showHeader() {
      if(store.page == PAGES_NAME.grid) return false;

      return this.isActive || this.isOpen;
    },
    transitionDirection() {
      if(store.scrollDirection < 0) return '-bottom';

      return '-top';
    },
    formatedIndex() {
      let number = '';
      
      if(this.index + 1 < 10) {
        number += '0';
      }
      number += this.index + 1;
      return number;
    }
  },
  mounted() {
  },
  components: {
    SlidingTitle,
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";
  
  .Project {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;

    &.isOpen {
      pointer-events: auto;

      .Project__picture {
        transform: rotate(0deg) scale(1.2);
      }
      .Project__inner {
        display: block;
      }
      .Project__title {
        cursor: default;
      }
      .Project__header {
        height: 50vh;
      }
    }

    &.isActive {
      z-index: 5;
      pointer-events: auto;

      .Project__number {
        opacity: 1;
      }
    }

    &__number {
      font-size: 1.25rem;
      font-family: $font-title;
      height: 5.3125rem;
      width: 5.3125rem;
      border:2px solid rgba($white, .5);
      border-radius: 50%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      margin-top: -#{$title-height * 0.75};
      opacity: 0;
      transition: opacity .5s;

      &--inner {
        height: 1.5rem;
        width: 3rem;
        overflow:hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__header {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      position: relative;
      transition: height 1s $cbezier1;
    }

    &__title {
      height: $title-height;
      font-size: 8.5vw;
      text-transform: uppercase;
      width: 100%;
      z-index: 2;
      display: block;
      overflow: hidden;
      position: relative;

      &:hover .SlidingTitle a {
        color: $white;
      }
    }

    &__picture {
      @include image-rotated();
    }

    &__inner {
      min-height: 100vh;
      background: $grey-light;
      display: none;
    }

    &__info {
      color: $greige;
      display: flex;
      padding-top: 6.25rem;
      font-size: 1rem;
      strong {
        color: $brown;
        display: block;
        margin-bottom: 1rem;
      }
      p {
        margin: 0;
      }
    }

    &__info--left {
      min-width: 25%;
      div {
        margin-bottom: 1.5rem;
      }
    }
    &__info--right {
      line-height: 1.5rem;
      padding-right: 40%;
    }

    &__pictures {
      padding: 10rem 0;
      div {
        margin-bottom: 10rem;
        background: $grey;
      }

      img {
        height: auto;
        display: block;
        width: 100%;
      }
    }
  }
</style>