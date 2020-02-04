<template>
  <div class="SlidingTitle">
    <router-link 
    class="js-sliding-text"
    v-for="(string, i) in elements" 
    :key="title + '-' + string + '-' + i"
    :to="isLinkValid(slugs[i])" 
    :style="{transform: 'translateX(' + positions[i] + 'px)'}"
    ><span @mouseenter="$emit('hover', {slug: slugs[i] || null})" v-html="string"></span>
    </router-link>
  </div>
</template>

<script>
import store from '../store/store';
import { rand } from '../utils/functions';
import RafManager from '../utils/RafManager';

export default {
  name: 'SlidingTitle',
  data() {
    return {
      inited: false,
      positions: [],
      virtualPosition: [],
      elements: [],
      slugs: [],
      widths: [],
      totalWidth: 0,
    }
  },
  props: {
    title: null,
    slug: null,
    isActive: Boolean,
    start: null,
    scroll: null
  },
  mounted() {

    window.addEventListener('resize', this.onResize.bind(this));
    this.$nextTick( () => {
      this.elements = this.splitTitle(this.title);
      this.randomizeStart = this.start || 0;
      this.direction = this.scroll || 1;

      RafManager.addQueue(this.render.bind(this))
    });
  },
  methods: {
    isLinkValid(slug) {
      if (slug) {
        return {name: 'project', params:{slug: slug }};
      }

      return {};
    },
    onResize() {
      this.inited = false;
    },
    render() {
      if(!this.isActive) {
        return false;
      } 

      if(!this.inited) {
        this.init();
      } else {
        const windowWidth = store.windowWidth;
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
    },
    init() {
      this.totalWidth = 0;
      this.widths = [];
      this.positions = [];
      const marginRight = 50;
      const $elements = this.$el.querySelectorAll('.js-sliding-text');

      $elements.forEach( ($el, i) => {
        const width = $el.offsetWidth + marginRight;
        this.positions.push(this.totalWidth + this.randomizeStart);
        this.widths.push(width);
        this.totalWidth += width;
      });

      this.virtualPosition = [...this.positions];

      if(this.totalWidth > 0) {
        this.inited = true;
      }

      const minWidth = store.windowWidth + this.widths[0] + this.widths[this.widths.length - 1];
      if(this.totalWidth < minWidth) {
        this.multiplyTitle(Math.floor(minWidth / this.totalWidth));
      }

      this.resetSlugs(this.slug);
    },
    multiplyTitle(by) {
      for(let i = 0; i < by; i++) {
        let title = this.splitTitle(this.title);
        
        for(let a = 0; i < title.length; i++) {
          this.elements.push(title[i]);
        }
      }
      this.$nextTick( () => {
        this.init();
      });
    },
    splitTitle(title) {
      if(typeof title === 'object') {
        let a = [];
        title.map( str => a.push(str));
        return a;
      } else if (typeof title === 'string') {
        return title.split(' ');
      }
      
      return title;
    },
    resetSlugs(slug) {
      this.slugs = [];
      if(typeof slug == 'object') {
        let index = 0;
        this.elements.map(string => {
          this.slugs.push(slug[index])
          index++;
          if(index >= slug.length) index = 0;
        });
        this.elements.map(string => {
          this.slugs.push(slug[0]);
        });
      } else {
        this.elements.map(string => {
          this.slugs.push(slug);
        });

      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf";

  .SlidingTitle {
    position: absolute;
    white-space: nowrap;
    width: 100%;
    height: $title-height;
    overflow: hidden;
    font-family: $font-title;
    font-weight: bold;
    z-index: 50;
    font-size: 1em;

    @include touch {
      height: $title-height*2.1;
    }

    > a {
      text-decoration: none;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      transition: color .3s;
      @include text-border($white, 1px);

      &:hover {
        @include desktop {
          color: $white;
        }
      }
    }
  }
</style>