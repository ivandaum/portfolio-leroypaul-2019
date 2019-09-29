<template>
  <div class="Project" :class="{isActive: isActive, isOpen: isOpen}">
    <div class="Project__header">
      <div class="Project__number">
        <transition :name="'slide' + transitionDirection()">
          <p v-show="showHeader()">{{ formatedIndex() }}</p>
        </transition>
      </div>

      <router-link class="Project__title" :to="{name: 'project', params:{slug:data.slug}}">
        <transition :name="'slide' + transitionDirection()">
              <SlidingTitle :title="data.title" :isActive="showHeader()" v-show="showHeader()" :index="index" />
        </transition>
      </router-link>

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

    &.isOpen &__preview {
      transform: rotate(0deg) scale(1.2);
    }

    &.isOpen &__inner {
      display: block;
    }

    &.isOpen &__title {
      cursor: default;
    }

    &.isActive {
      z-index: 5;
    }

    &__number {
      font-size: 1.25rem;
      font-family: $font-title;
      height: 5.3125rem;
      width: 5.3125rem;
      border-radius: 50%;
      border: 2px solid $white;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      margin-top: -#{$title-height * 0.75};
      padding: 3rem;
    }

    &__header {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
    }

    &__title {
      height: $title-height;
      font-size: 8.5vw;
      text-transform: uppercase;
      width: 100%;
      z-index: 2;
      pointer-events: auto;
      display: block;
      overflow: hidden;
      position: relative;
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