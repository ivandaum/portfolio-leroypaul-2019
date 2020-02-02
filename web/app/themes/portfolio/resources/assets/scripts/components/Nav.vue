<template>
  <nav class="Nav" :class="{'is-brown': routeIs([PAGES_NAME.about])}">
    <div class="Nav__logo" :class="{active: isSiteLoaded}">
      <router-link :to="{name: 'home'}">Paul.</router-link>
    </div>
    <ul class="Nav__right">
      <li class="is-relative" :class="{active: routeIs([PAGES_NAME.home]) && isSiteLoaded}">
        <router-link :to="{name: 'projects'}">All projects</router-link>
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
    font-family: $font-title;

    @include tablet {
      padding: 4rem 5rem 0 5rem;
    }

    @include phone {
      padding: 2.4rem 3rem 0 3rem;
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

      &.active a {
        transform: translateY(0);
      }
    }

    &__right {
      display: flex;
      align-items: flex-end;
      font-size: 1.2rem;
      letter-spacing: 0.18px;
      margin: 0;
      padding: 0;
      position: relative;

      @include phone {
        margin-top: 0.3rem;
      }
    }

    li {
      height: 2rem;
      overflow: hidden;
      pointer-events: none;

      &:first-of-type {
        margin-right: 1.6rem;
      }

      &.active {
        pointer-events: auto;
      }

      &.active a {
        transform: translateY(0);
      }
    }

    &__close {
      width: 6.5rem;
      position: absolute;
      right: 0;
      top: 0;
    }

    &.is-brown a {
      color: $brown;
    }
  }
</style>