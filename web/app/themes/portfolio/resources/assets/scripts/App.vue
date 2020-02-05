<template>
  <div id="app" class="App" 
    :class="{'on-touch': touchValue.length}" 
    v-on:wheel="onWheel"
    v-on:scroll="onScroll"
    v-on:touchstart="onTouchStart" 
    v-on:touchmove="onTouchMove" 
    v-on:touchend="onTouchEnd"
    v-on:touchcancel="onTouchEnd"
    v-on:mousemove="onMouseMove"
  >
    <CustomCursor 
      :position="cursorPosition" 
      :isActive="store.page == PAGES_NAME.home"
    />
    <Loader />
    <Nav />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import RafManager from './utils/RafManager';
import store from './store/store';
import { PAGES_NAME } from './utils/constants';
import normalize from 'normalize-wheel';
import Nav from './components/Nav.vue';
import CustomCursor from './components/CustomCursor.vue';
import Loader from './views/Loader.vue';

export default {
  name: 'App',
  data() {
    return {
      touchValue: [],
      cursorPosition: [],
      store: store,
      PAGES_NAME: PAGES_NAME
    }
  },
  mounted () {
    this.canScroll = true;
    this.raf = null;
    store.$scrollContainer = this.$el;
    store.$scroller = this.$el.querySelector('.js-scroller');

    store.$emit('app-loaded');

    window.addEventListener('resize', this.onResize.bind(this));
  },
  watch:{
    $route (to, from) {
      store.page = this.$route.params.page;
      store.slug = this.$route.params.slug ? this.$route.params.slug : null;
    }
  },
  methods: {
    onHomeScroll(scroll) {
      if(!this.canScroll) return false;

      this.canScroll = false;
      const direction = scroll.spinY > 0 ? 1 : -1;
      const current = store.getNextProject(direction);

      store.project = current;
      store.scrollDirection = direction;

      store.$emit('switch-project', current);
      
      setTimeout( () => {
        this.canScroll = true;
      }, 2000);
    },
    onResize() {
      store.windowWidth = window.innerWidth;
      store.windowHeight =  window.innerHeight;
    },
    onMouseMove(e) {
      this.cursorPosition = [e.pageX, e.pageY];
    },
    onTouchEnd(e) {
      this.touchValue = []
    },
    onTouchStart(e) {
      const touch = e.touches[0];
      this.touchValue = [touch.pageX, touch.pageY];
    },
    onTouchMove(e) {
      if(store.page == PAGES_NAME.home) {
        const touch = e.touches[0];
        const diff = this.touchValue[1] - touch.pageY;
        this.onHomeScroll({spinY: diff});
        this.touchValue = [touch.pageX, touch.pageY];
      }
    },
    onWheel(e) {
      const scroll = normalize(e);
      store.scroll = store.$scrollContainer.scrollTop;

      if(store.page === PAGES_NAME.home) {
        this.onHomeScroll(scroll);
      }
    },
    onScroll(e) {
      const scroll = normalize(e);
      store.scroll = store.$scrollContainer.scrollTop;
    },
  },
  components: { 
    Nav,
    Loader,
    CustomCursor,
  },
}
</script>
<style lang='scss'>
  @import "../styles/conf";
  .App {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;

    // &.on-touch .Galery {
    //   transition-duration: $easing / 2;
    //   transform: scale(0.9);
    // }
  }
</style>
