<template>
  <div class="Project" :class="{'is-open': isOpen}">
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
    index: Number,
  },
  watch:{
    $route (to, from) {
      if(from.name === PAGES_NAME.grid && to.name === PAGES_NAME.home) {
        store.scrollDirection = 0;
      }
    }
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
    transitionImageDirection() {
      if(store.scrollDirection < 0) return '-bottom';
      else if(store.scrollDirection == 0) return '-none';

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
    height: 100%;
    width: 100%;
    z-index: 100;

    pointer-events: none;

    &.is-open {
      pointer-events: auto;
    }

    &__inner {
      min-height: 100vh;
      background: $grey-light;
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
        font-style: normal;
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