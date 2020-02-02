<template>
  <div class="GridTitles is-centered-container is-absolute">
    <div class="GridTitles__titles container-titles" v-for="i in 4" :key="'grid-titles' + i">
      <transition :name="'title-top'">
        <SlidingTitle @hover="onHover" :scroll="i % 2 == 0 ? 1 : -1" :start="i * 1000" :slug="slugs" :title="titles" :isActive="isGridActive()" v-show="isGridActive()" />
      </transition>
    </div>
  </div>
</template>

<script>
import store from './../../store/store';
import { PAGES_NAME } from './../../utils/constants';
import SlidingTitle from '../../components/SlidingTitle.vue';

export default {
  name: 'GridTitles',
  data() {
      return {
        slugs: [],
        titles: [],
      }
  },
  props: {
    current: Number,
    projects: Array
  },
  mounted() {
    for(let i = 0; i < this.projects.length; i++) {
      this.titles.push(this.projects[i].title);
      this.slugs.push(this.projects[i].slug);
    }
  },
  methods: {
    isGridActive() {
      return store.page == PAGES_NAME.grid;
    },
    onHover(data) {
      for(let i = 0; i < this.projects.length; i++) {
        if(data.slug === this.projects[i].slug) {
          store.$emit('switch-project', i);
          break;
        }
      }
    },
  },
  components: {
    SlidingTitle
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf";
  .GridTitles {
    a:nth-of-type(even):not(:hover) {
      color: rgba($white, .3);
      @include no-text-border;
    }
  }
</style>