<template>
  <div class="SlidingTitle">
    <div class="js-sliding-text" 
    v-for="(string, i) in elements" 
    :key="title + '-' + string + '-' + i"
    :style="{transform: 'translateX(' + positions[i] + 'px)'}" 
    :class="{isWhite:whiteTitle[i]}"
    >{{string}}</div>
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
        virtualPosition: [],
        elements: [],
        widths: [],
        whiteTitle: [],
        isWhite: true,
        totalWidth: 0,
        inited: false,
        direction: 1,
      }
  },
  props: {
    title: String,
    isActive: Boolean,
    index: Number
  },
  mounted() {
    this.elements = this.title.split(' ');

    store.$on('render', () => {
      if(!this.isActive) {
        return false;
      } 

      if(!this.inited) {
        this.init();
      } else {
        const windowWidth = store.$get('windowWidth');
        const totalWidth = this.totalWidth;

        this.virtualPosition.map( (x, i) => {
          x -= this.direction;

          if(x + this.widths[i] < 0) {
            x += this.totalWidth;
          }

          if(x > windowWidth) {
            x -= totalWidth;
          }

          this.virtualPosition[i] = x;

          if(x + this.widths[i] > 0 && x < windowWidth) {
            this.positions[i] = this.virtualPosition[i];
          }
          
          this.$set(this.positions, i, this.positions[i]);
        });
      }
    })
  },
  methods: {
    init() {
      this.totalWidth = 0;
      this.widths = [];
      this.positions = [];
      const marginRight = 50;
      const $elements = this.$el.querySelectorAll('.js-sliding-text');
      $elements.forEach( ($el, i) => {
        const width = $el.offsetWidth + marginRight;
        this.whiteTitle.push(this.isWhite);
        this.positions.push(this.totalWidth);
        this.widths.push(width);
        this.totalWidth += width;
      });

      this.virtualPosition = [...this.positions];

      if(this.totalWidth > 0) {
        this.inited = true;
      }

      const minWidth = store.$get('windowWidth') + this.widths[0] + this.widths[this.widths.length - 1];
      if(this.totalWidth < minWidth) {
        this.multiplyTitle(Math.floor(minWidth / this.totalWidth));
      }
    },
    multiplyTitle(by) {
      this.isWhite = false;
      for(let i = 0; i < by; i++) {
        const title = this.title.split(' ');
        for(let a = 0; i < title.length; i++) {
          this.elements.push(title[i]);
        }
      }

      this.$nextTick( () => {
        this.init();
      })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .SlidingTitle {
    position: absolute;
    white-space: nowrap;
    width: 100%;
    height: $title-height;
    overflow: hidden;
    font-family: $font-title;
    font-weight: bold;

    > div {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      @include text-border($white, 1px);
    }

    > div.isWhite {
      @include text-border(transparent, 0);
      color: $white;
    }
  }
</style>