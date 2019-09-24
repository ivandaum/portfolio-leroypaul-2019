<template>
  <div class="ProjectContent" :class="{isOpen: isOpen}">
    <div class="ProjectContent__inner">
      <div class="ProjectContent__info container">
        <div class="ProjectContent__info--left">
          <div v-if="data.client">
            <strong>Client</strong>
            <p>{{data.client}}</p>
          </div>
          <div v-if="data.date">
            <strong>Date</strong>
            <p>{{data.date}}</p>
          </div>
          <div v-if="data.project_url.length">
            <a :href="url" v-for="(url, name) in data.project_url" :key="name">Voir sur {{name}}</a>
          </div>
        </div>
        <div class="ProjectContent__info--right">
          <strong v-if="data.subtitle">{{data.subtitle}}</strong>
          <div v-if="data.description">{{data.description}}</div>
        </div>
      </div>
      <div class="ProjectContent__pictures">
        <div v-for="(img, i) in data.content" :key="i" :class="{container: img.type == 'center', 'container-fluid': img.type == 'full' }">
          <img :width="img.width" :height="img.height" :src="img.url" :alt="data.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlidingTitle from '../components/SlidingTitle.vue';

export default {
  name: 'ProjectContent',
  data() {
      return {
      }
  },
  props: {
    data: Object,
    isOpen: Boolean,
    index: Number
  },
  updated() {

  },
  mounted() {
  },
  components: {
    SlidingTitle,
  }
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  .ProjectContent {
    position: absolute;
    top: 100vh;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: none;

    &.isOpen &__preview {
      transform: rotate(0deg) scale(1.2);
    }

    &.isOpen {
      display: block;
    }

    &__inner {
      min-height: 100vh;
      background: $grey-light;
    }

    &__info {
      color: $greige;
      display: flex;
      padding-top: 6.25rem;
      font-size: 1rem;
      strong {
        color: $brown;
        display: block;
        margin-bottom: 1rem;
      }
      p {
        margin: 0;
      }
    }

    &__info--left {
      min-width: 25%;
      div {
        margin-bottom: 1.5rem;
      }
    }
    &__info--right {
      line-height: 1.5rem;
      padding-right: 40%;
    }

    &__pictures {
      padding: 10rem 0;
      div {
        margin-bottom: 10rem;
        background: $grey;
      }

      img {
        height: auto;
        display: block;
        width: 100%;
      }
    }
  }
</style>