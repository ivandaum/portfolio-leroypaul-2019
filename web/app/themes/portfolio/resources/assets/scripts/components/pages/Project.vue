<template>
  <div class="Project">
    <div class="Project__inner">
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
          <ImageSource v-if="img.image" :image="img.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSource from '../../components/ImageSource.vue';
import SlidingTitle from '../../components/SlidingTitle.vue';
import store from '../../store/store';
import { PAGES_NAME } from './../../utils/constants';

export default {
  name: 'Project',
  data() {
    return {
      store: store
    }
  },
  props: {
    data: Object,
    isOpen: Boolean,
    index: Number,
  },
  methods: {
  },
  mounted() {
  },
  components: {
    SlidingTitle,
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf/variables";
  @import "../../../styles/conf/mixins";
  
  .Project {
    height: 100%;
    width: 100%;
    z-index: 100;
    margin-bottom: -50vh;

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
        font-style: normal;
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