<template>
  <div class="Project" :class="{isGrid:isGrid, isTitleActive: isTitleActive, isOpen: isOpen}">
    <div class="Project__header">
      <router-link 
        class="Project__title"
        :to="{name: 'project', params:{slug:data.slug}}" 
      >
        <transition name="slide-in">
          <SlidingTitle :title="data.title" :isActive="isTitleActive || isOpen" v-show="isTitleActive || isOpen" />
        </transition>
      </router-link>
      <div class="Project__preview">
        <transition name="picture-slide-in">
          <img :src="data.preview_image.sizes.large" v-show="isTitleActive || isOpen" />
        </transition>
      </div>
    </div>
    <div class="Project__content">
      <div class="Project__info container">
        <div class="Project__info--left">
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
        <div class="Project__info--right">
          <strong v-if="data.subtitle">{{data.subtitle}}</strong>
          <div v-if="data.description">{{data.description}}</div>
        </div>
      </div>
      <div class="Project__pictures">
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
  name: 'Project',
  data() {
      return {
      }
  },
  props: {
    data: Object,
    isTitleActive: Boolean,
    isOpen: Boolean,
    isGrid: Boolean,
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

  .Project {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    &.isTitleActive {
      z-index: 5;
      pointer-events: auto;
    }

    &.isOpen &__content {
      display: block;
    }

    &.isOpen &__preview {
      transform: rotate(0deg) scale(1.2);
    }

    &__header {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
      pointer-events: none;
    }

    &__title {
      width: 100%;
      height: $title-height;
      overflow: hidden;
      position: relative;
      z-index: 2;
      pointer-events: auto;
    }

    &__preview {
      width: 30vw;
      height: 45vw;
      max-height:70vh;
      max-width: 50vh;
      position: absolute;
      overflow: hidden;
      z-index: 1;
      transform-origin: center center;
      transform: rotate(10deg);
      pointer-events: none;
      transition: transform .5s ease-in-out;
      img {
        position: absolute;
        object-fit: cover;
        display: block;
        height: 100%;
        width: 100%;
      }
    }

    &__content {
      min-height: 100vh;
      display: none;
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