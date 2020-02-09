<template>
  <nav class="Nav" :class="{'is-brown': routeIs([PAGES_NAME.about]) || isProjectScrolled()}">
    <div class="Nav__logo" :class="{active: isSiteLoaded}">
      <router-link :to="{name: 'home'}">Paul</router-link>
    </div>
    <ul class="Nav__right">
      <transition :name="'cursor'">
        <sup v-if="store.projects" v-show="routeIs([PAGES_NAME.home])">{{projectCount()}}</sup>
      </transition>
      <li class="is-relative" :class="{active: routeIs([PAGES_NAME.home]) && isSiteLoaded}">
        <router-link :to="{name: 'projects'}">All works</router-link>
      </li>
      <li class="is-relative" :class="{active: !routeIs([PAGES_NAME.about, PAGES_NAME.slug]) && isSiteLoaded}">
        <router-link :to="{name: 'about'}">About</router-link>
      </li>
      <li class="Nav__close" :class="{active: routeIs([PAGES_NAME.slug, PAGES_NAME.about]) && isSiteLoaded}">
        <router-link :to="{name: 'home'}">Close</router-link>
      </li>
    </ul>
  </Nav>
</template>

<script>
import store from '../store/store';
import { PAGES_NAME } from '../utils/constants';

export default {
  name:'Nav',
  data() {
      return {
        store: store,
        isSiteLoaded: false,
        PAGES_NAME: PAGES_NAME
      }
  },
  mounted() {
    store.$on('projects-loaded', () => {
      this.isSiteLoaded = true;
    });
  },
  methods: {
    projectCount() {
      return store.projects.length < 10 ? '0' + store.projects.length : store.projects.length;
    },
    isProjectScrolled() {
      return store.scroll > store.windowHeight && store.page === PAGES_NAME.slug || store.projectScrolled;
    },
    routeIs(routes) {
      return routes.indexOf(this.store.page) !== -1;
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf";

  .Nav {
    position: fixed;
    width: 100%;
    display: flex;
    padding: 10rem 10rem 0 10rem;
    justify-content: space-between;
    top: 0;
    z-index: 300;

    @include tablet {
      padding: 4rem 5rem 0 5rem;
    }

    @include phone {
      padding: 3rem 2.4rem 0 2.4rem;
    }

    a {
      color: $white;
      text-decoration: none;
      display: block;
      height: 100%;
      transform: translateY(-100%);
      transition: transform $easing, color $easing;
    }

    &__logo {
      font-size: 1.4rem;
      letter-spacing: 0.2rem;
      font-weight: bold;
      text-transform: uppercase;
      height: 2rem;
      overflow: hidden;
      font-family: $font-title;

      &.active a {
        transform: translateY(0);
      }

      // span {
      //   display: block;
      //   font-family: $font-regular;
      //   font-size: 1.4rem;
      //   text-transform: none;
      //   letter-spacing: 0;
      // }
    }

    &__right {
      display: flex;
      align-items: flex-end;
      font-size: 1.4rem;
      font-weight: bold;
      margin: 0;
      padding: 0;
      position: relative;

      @include phone {
        margin-top: 0.2rem;
      }
    }

    li {
      height: 2rem;
      overflow: hidden;
      pointer-events: none;

      &:first-of-type {
        margin-right: 2.6rem;
      }

      &.active {
        pointer-events: auto;
      }

      &.active a {
        transform: translateY(0);
      }
    }

    sup {
      font-size: 1.4rem;
      left: 6rem;
      top: -1rem;
      position: absolute;
      display: block;
      pointer-events: none;
    }

    &__close {
      width: 6.5rem;
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
    }

    &.is-brown a {
      color: $brown;
    }
  }
</style>