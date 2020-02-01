<template>
  <nav class="Nav" :class="{'is-brown': routeIs([PAGES_NAME.about])}">
    <router-link :to="{name: 'home'}" class="Nav__logo">Paul.</router-link>
    <ul class="Nav__right">
      <li class="is-relative" :class="{active: routeIs([PAGES_NAME.home])}">
        <router-link :to="{name: 'projects'}">All projects</router-link>
      </li>
      <li class="is-relative" :class="{active: !routeIs([PAGES_NAME.about, PAGES_NAME.slug])}">
        <router-link :to="{name: 'about'}">About</router-link>
      </li>
      <li class="Nav__close" :class="{active: routeIs([PAGES_NAME.slug, PAGES_NAME.about])}">
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
        PAGES_NAME: PAGES_NAME
      }
  },
  mounted() {
    
  },
  methods: {
    routeIs(routes) {
      return routes.indexOf(this.store.page) !== -1;
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .Nav {
    position: fixed;
    width: 100%;
    display: flex;
    padding: 100px 100px 0 100px;
    justify-content: space-between;
    top: 0;
    z-index: 300;
    font-family: $font-title;

    a {
      color: $white;
      text-decoration: none;
      display: block;
      height: 100%;
      min-width: 70px;
      transform: translateY(-100%);
      transition: transform $easing, color $easing;
    }

    a:hover {
    }

    &__logo {
      font-size: .875rem;
      letter-spacing: 2px;
      font-weight: bold;
      text-transform: uppercase;
    }

    &__right {
      display: flex;
      align-items: flex-end;
      font-size: .75rem;
      letter-spacing: .18px;
      margin: 0;
      padding: 0;
      position: relative;
    }

    &__right li {
      height: 20px;
      overflow: hidden;
      pointer-events: none;

      &:first-of-type {
        margin-right: 1rem;
      }

      &.active {
        pointer-events: auto;
      }

      &.active a {
        transform: translateY(0);
      }
    }

    &__close {
      width: 65px;
      position: absolute;
      right: 0;
      top: 0;
    }

    &.is-brown a {
      color: $brown;
    }
  }
</style>