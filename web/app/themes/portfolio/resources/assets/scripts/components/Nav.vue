<template>
  <nav class="Nav">
    <router-link :to="{name: 'home'}" class="Nav__logo">Paul.</router-link>
    <ul class="Nav__right">
      <li class="is-relative">
        <transition :name="'slide-top'">
          <router-link :to="{name: 'projects'}" v-show="PAGES_NAME.grid !== store.page">All projects</router-link>
        </transition>
      </li>
      <li class="is-relative Nav__about-link">
        <transition :name="'slide-top'">
          <router-link :to="{name: 'about'}" v-show="PAGES_NAME.about !== store.page">About</router-link>
        </transition>
        <transition :name="'slide-top'">
          <router-link :to="{name: 'home'}" v-show="PAGES_NAME.about === store.page">Fermer</router-link>
        </transition>
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
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

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
    }

    &__right li {
      height: 20px;
      overflow: hidden;

      &:last-of-type {
        margin-left: 1rem;
      }
    }

    &__about-link {
      width: 65px;
      a {
        position: absolute;
      }
    }
  }
</style>