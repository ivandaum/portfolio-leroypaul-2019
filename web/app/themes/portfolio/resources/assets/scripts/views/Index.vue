<template>
  <div class="Index container-fluid js-scroller" 
    :class="{
      'project--open': store.page === PAGES_NAME.slug,
      'grid--open': store.page === PAGES_NAME.grid,
      'home--open': store.page === PAGES_NAME.home,
      'about--open': store.page === PAGES_NAME.about,
      'project--scrolled': store.scroll > store.windowHeight && store.page === PAGES_NAME.slug,
      'preload--next-project': store.projectScrolled
    }"
  >
    <About :datas="store.about" v-if="store.about" :isActive="store.page === PAGES_NAME.about"/>
    <div class="Index__previews">
      <Galery 
        :current="current" 
        :isFull="store.hasOpenedProject()" 
      />
      <ActiveTitle
        v-if="projects.length"
        :current="current"
        :projects="projects"
        @hover="titleIsHovered"
      />

      <GridTitles
        v-if="projects.length"
        :current="current"
        :projects="projects"
      />
    </div>
      <div class="Index__projects">
        <transition-group :name="'fade-project'">
          <Project 
            v-for="(project, i) in projects"
            :key="'content-' + i" 
            :data="project"
            :index="i"
            v-show="store.isProjectOpen(project.slug)"
            :isOpen="store.isProjectOpen(project.slug)"
          />
        </transition-group>
      </div>
  </div>
</template>

<script>
import { PAGES_NAME } from './../utils/constants';
import store from './../store/store';

import Galery from '../components/home/Galery.vue';
import ActiveTitle from '../components/home/ActiveTitle.vue';
import GridTitles from '../components/home/GridTitles.vue';
import Project from '../components/pages/Project.vue';
import About from '../components/pages/About.vue';
import RafManager from '../utils/RafManager';

export default {
  name: 'Index',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME: PAGES_NAME,
      store: store,
      about: {},
    }
  },
  mounted() {
    store.$on('projects-loaded', () => {
      const projects = store.projects;
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
      this.$preview = this.$el.querySelector('.js-stuck-on-scroll');
    });

    store.$on('switch-project', (value) => {
      this.current = value;
      store.project = value;
    });

  },
  beforeRouteUpdate: (to, from, next) => {
    console.log('template update');
    next();
  },
  methods: {
    isActive(index) {
      if(store.page === PAGES_NAME.grid) return false;
      return index == this.current
    },
    titleIsHovered(value) {
      store.titleIsHovered = value;
    }
  },
  components: {
    Project,
    GridTitles,
    Galery,
    ActiveTitle,
    About
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf";

  .Index {
    min-height: 100vh;
    max-height: 100vh;
    &:not(.project--open) {
      overflow: hidden;
    }

    &__previews {
      height: 100vh;
      width: 100%;
      display: block;
      z-index: 1;
      position: sticky;
      top: 0;
    }

    &__projects {
      position: relative;
      top: 0;
      z-index: 10;
      transform: translateY(-100vh);
      margin-top: 100vh;
      transition: margin $easing $cbezier1;
    }

    .ActiveTitle,
    .ActiveTitle__number,
    .Galery {
      transition: transform $easing $cbezier1, opacity $easing $cbezier1;
    }
  }

  .Index.project--open {
    max-height: fit-content;

    .Index__projects {
      margin-top: 70vh;
    }
    .ActiveTitle {
      z-index: 15;
    }
  }

  .Index.project--scrolled .Galery__picture.isActiveProjectCover {
    opacity: 0;
  }

  .Index.project--open:not(.preload--next-project) {
    .ActiveTitle {
      transform: translateY(-15%);
    }

    .ActiveTitle__number {
      transform: translateY(-10vh);
    }

    .ActiveTitle .SlidingTitle a {
      color: $white;
    }
  }

  .Index.grid--open .GridTitles,
  .Index.home--open .ActiveTitle {
    z-index: 60;
  }

  .Index.about--open .About {
    pointer-events: auto;
  }
</style>