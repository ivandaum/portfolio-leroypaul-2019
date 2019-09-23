<template>
  <div class="SlidingTitle">
    <div class="SlidingTitle__text js-sliding-text" :style="{transform: 'translateX(' + positions[i-1] + 'px)'}" :class="{white: i == whiteIndex}" v-for="i in elementsCount" :key="i">{{title}}</div>
  </div>
</template>

<script>
import store from '../store/store';
import { rand } from '../utils/functions';

export default {
  name: 'SlidingTitle',
  data() {
      return {
        positions: [],
        elementsCount: 10,
        whiteIndex: 1
      }
  },
  props: {
    title: String,
    isActive: Boolean,
  },
  mounted() {
    store.$on('projectsLoaded', () => {
      this.setPositions();
      this.canTranslate = false;
      this.timeoutAnimation = null;
    });
    
    store.$on('render', () => {

      if(!this.isActive && this.canTranslate && this.timeoutAnimation === null) {
        this.timeoutAnimation = setTimeout( () => this.canTranslate = false, 1000);
      } else if (this.isActive && !this.canTranslate) {
        this.canTranslate = true;
        clearTimeout(this.timeoutAnimation);
        this.timeoutAnimation = null;
      }

      // If we can't update elements, break
      if(!this.canTranslate) return false;

      if(!this.positionCalcWhenShown) {
        this.setPositions();
      }

      this.positions.map( (x, i) => {
        x -= 1;
        if(x + this.stringsWidths[i] < 0) {
          x += this.stringsTotalWidth
        }
        if(x > store.windowWidth) {
          x -= this.stringsTotalWidth
        }
        this.$set(this.positions, i, x)
      });
    })
  },
  methods: {
    setPositions() {
      const $el = this.$el.querySelector('.js-sliding-text');
      const firstElWidth = $el.offsetWidth;

      if(firstElWidth > 0) {
        this.elementsCount = Math.ceil(store.$get('windowWidth') / firstElWidth) + 2
      }

      this.stringsTotalWidth = 0;
      this.stringsWidths = [];
      this.positions = [];

      this.$nextTick( () => {
        const margin = 50;
        const randomizeStartPosition = rand(0, store.windowWidth * .25);
        const $elements = this.$el.querySelectorAll('.js-sliding-text');
        
        $elements.forEach( ($el,i) => {
          const width = $el.offsetWidth + margin;
          this.positions.push(this.stringsTotalWidth);
          this.stringsWidths.push(width);
          this.stringsTotalWidth += width;
        });

        this.whiteIndex = rand(0, this.elementsCount);
        this.positionCalcWhenShown = this.isActive;
      })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .SlidingTitle {
    font-size: 10vw;
    text-transform: uppercase;
    font-weight: bold;
    position: absolute;
    display: block;
    white-space: nowrap;
    width: 100%;
    height: $title-height;
    overflow: hidden;

    &__text {
      display: block;
      margin-right: 3rem;
      position: absolute;
      left: 0;
      top: 0;
      &:last-child {
        margin-right: 0;
      }
      @include text-border($white);

      &.white {
        color: $white;
      }
    }
  }
</style>