<template>
  <div class="ProjectTitle" :style="{transform: 'translateY(' + translateY + 'px)'}" :class="{isTitleActive: isTitleActive || isGrid}">
    <router-link :to="{name: 'project', params:{slug:data.slug}}">
      <transition name="slide-in">
        <SlidingTitle :title="data.title" :isActive="isTitleActive || isOpen || isGrid" v-show="isTitleActive || isOpen || isGrid" :index="index" />
      </transition>
    </router-link>
  </div>
</template>

<script>
import SlidingTitle from '../components/SlidingTitle.vue';
import store from '../store/store';

export default {
  name: 'Project',
  data() {
      return {
        translateY: 0
      }
  },
  props: {
    data: Object,
    isTitleActive: Boolean,
    isOpen: Boolean,
    isGrid: Boolean,
    index: Number,
  },
  updated() {
    if(this.isGrid) {
        this.translateY = this.getGridPosition();
      } else {
        setTimeout( () => this.translateY = 0, 1000);
      }
  },
  mounted() {
    if(this.isGrid) {
      this.translateY = this.getGridPosition();
    }
  },
  methods: {
    getGridPosition() {
      return this.index * (store.$get('windowWidth') * .1);
    }
  },
  components: {
    SlidingTitle,
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .ProjectTitle {
    width: 100%;
    height: $title-height;
    overflow: hidden;
    position: absolute;
    z-index: 2;
    pointer-events: auto;


    &.isTitleActive {
      z-index: 5;
      pointer-events: auto;
    }
  }
</style>