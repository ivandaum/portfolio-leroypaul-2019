<template>
  <div class="Project">
    <div class="Project__inner">
      <div class="Project__info container">
        <div class="Project__info--left">
          <div class="Project__details">
            <div v-if="data.client">
              <strong>Client</strong>
              <p>{{data.client}}</p>
            </div>
            <div v-if="data.date">
              <strong>Date</strong>
              <p>{{data.date}}</p>
            </div>
          </div>
          <div v-if="links" class="Project__links">
            <div v-for="(link, name) in links" :key="name"><a :href="link.href">{{link.wording}}</a></div>
          </div>
        </div>
        <div class="Project__info--right">
          <strong v-if="data.subtitle">{{data.subtitle}}</strong>
          <div v-if="data.description">{{data.description}}</div>
        </div>
      </div>
      <div class="Project__pictures" v-if="isOpen">
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
      store: store,
      links: []
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
    for(let name in this.data.project_url) {
      let link = {wording:'', href: this.data.project_url[name]}

      if (name === 'live') {
        link.wording = 'Voir le site';
      } else {
        link.wording = 'Voir sur ' + name;
      }

      this.links.push(link);
    }
  },
  components: {
    SlidingTitle,
    ImageSource
  }
}
</script>
<style lang="scss">
  @import "../../../styles/conf";
  
  .Project {
    height: 100%;
    width: 100%;
    z-index: 100;
    margin-bottom: -30vh;

    &__inner {
      min-height: 100vh;
      background: $grey-light;
    }

    &__info {
      color: $greige;
      display: flex;
      padding-top: 6.25rem;
        font-size: 1.6rem;

      @include phone {
        display: block;
        font-size: 1.4rem;
        padding-top: 4rem !important;
      }

      strong {
        color: $brown;
        display: block;
        font-weight: bold;
      }

      p {
        margin: 0;
      }

      a {
        margin-bottom: 1rem;
        color: $brown;
        font-weight: bold;
        position: relative;
        @include link-border;
        text-decoration: none;
        display: inline-block;
      }
    }

    &__links {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      @include phone {
        justify-content: flex-start;
        align-items: flex-start;
      }

      div {
        margin-bottom: 1rem;
      }
    }

    &__details div,
    &__details {
      margin-bottom: 2.4rem;
    }
    
    &__info--left {
      min-width: 25%;
      @include phone {
        display: flex;
        justify-content: space-between;
      }
    }

    &__info--right {
      line-height: 2.4rem;
      @include desktop {
        padding-right: 40%;
      }
    }

    &__pictures {
      padding: 0;
      div {
        margin-top: 15rem;

        @include phone {
          margin-top: 5rem;
        }
      }

      img {
        height: auto;
        display: block;
        width: 100%;
      }
    }
  }
</style>