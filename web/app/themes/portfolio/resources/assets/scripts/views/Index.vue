<template>
  <div class="Index container-fluid" 
    :class="{
      'project-open': store.page === PAGES_NAME.slug,
      'grid-open': store.page === PAGES_NAME.grid,
      'home-open': store.page === PAGES_NAME.home,
      'about-open': store.page === PAGES_NAME.about,
    }" 
  >
    <About :datas="store.about" v-if="store.about" :isActive="store.page === PAGES_NAME.about"/>
    <div class="Index__previews is-relative">
      <Galery :current="current"/>
      <ActiveTitle
        v-if="projects.length"
        :current="current"
        :projects="projects"
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

export default {
  name: 'Index',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME: PAGES_NAME,
      hasOpenedProject: false,
      store: store,
      about: {}
    }
  },
  mounted() {
    store.$on('projects-loaded', () => {
      const projects = store.projects;
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
    });
    store.$on('switch-project', (value) => {
      this.current = value;
    });
  },
  methods: {
    isActive(index) {
      if(store.page === PAGES_NAME.grid) return false;
      return index == this.current
    },
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
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .Index {
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;

    &__previews {
      height: 100vh;
      width: 100%;
      display: block;
    }

    &__previews,
    &__projects,
    .ActiveTitle,
    .Galery {
      transition: transform $easing $cbezier1, opacity $easing $cbezier1;
    }

    &.project-open {
      max-height: fit-content;

      .Index__previews {
        transform: scaleY(0.5) translateY(-50vh);
        .ActiveTitle,
        .Galery {
          transform: scaleY(2);

          .Galery__picture {
            transform: rotate(0deg);
          }
        }
      }
      .Index__projects {
        transform: translateY(-50vh);
      }
    }

    &.grid-open .GridTitles,
    &.home-open .ActiveTitle {
      z-index: 60;
    }

    &.home-open .ActiveTitle__number {
      opacity: 1;
    }

    &.about-open .About {
      pointer-events: auto;
    }
  }
</style>