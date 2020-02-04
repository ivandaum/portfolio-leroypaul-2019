<template>
  <div class="CustomCursor" :style="{transform: 'translate(' + getPosition() +')'}">
    <transition :name="'cursor'">
      <div class="CustomCursor__inner" v-show="store.titleIsHovered && isActive">
        <div class="CustomCursor__entry CustomCursor--hover"></div>
      </div>
    </transition>
    <transition :name="'cursor'">
      <div class="CustomCursor__inner" v-show="!store.titleIsHovered && isActive">
        <div class="CustomCursor__entry CustomCursor--scroll"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import store from '../store/store';
import { PAGES_NAME } from '../utils/constants';
import RafManager from '../utils/RafManager';

const SIZE = 80;

export default {
  name: 'CustomCursor',
  data() {
      return {
        store: store,
        PAGES_NAME: PAGES_NAME,
        x: -SIZE,
        y: -SIZE
      }
  },
  props: {
    position: Array,
    isActive: Boolean
  },
  mounted() {
    store.$on('projects-loaded', () => {
      const OFFSET = 40;
      this.x = OFFSET;
      this.y = store.windowHeight - SIZE - OFFSET;

      if (store.windowWidth > 768) {
        RafManager.addQueue(this.render.bind(this));
      }
    });
  },
  methods: {
    render() {
      const easing = 0.2;

      if (this.position[0]) {
        const x = this.position[0] - SIZE / 2;
        this.x += (x - this.x) * easing;
      }

      if (this.position[1]) {
        const y = this.position[1] - SIZE / 2;
        this.y += (y - this.y) * easing;
      }
    },
    getPosition() {
      return this.x + 'px, ' + this.y + 'px';
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf";

  .CustomCursor {
    position: fixed;
    width: 8rem;
    height: 8rem;
    z-index: 90;
    pointer-events: none;

    &__inner,
    &__entry {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    &--scroll {
      background: url($image-directory + '/cursor-scroll.svg') no-repeat center center;
      background-size: contain;
      animation: rotate 10s infinite linear;

      &:before {
        content: " ";
        display: block;
        height: 4.7rem;
        width: 4.7rem;
        border-radius: 50%;
        border: 0.2rem solid $brown-darker;
      }
    }

    &--hover {
      background: url($image-directory + '/cursor-scroll.svg') no-repeat center center;
      background-size: contain;
      animation: rotate 10s infinite linear;

      &:before {
        content: " ";
        display: block;
        height: 4.7rem;
        width: 4.7rem;
        background: $cursor-brown;
        border-radius: 50%;
      }
    }
  }
</style>