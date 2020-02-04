<template>
  <div class="Index container-fluid" 
    :class="{
      'project--open': store.page === PAGES_NAME.slug,
      'grid--open': store.page === PAGES_NAME.grid,
      'home--open': store.page === PAGES_NAME.home,
      'about--open': store.page === PAGES_NAME.about,
    }"
  >
    <About :datas="store.about" v-if="store.about" :isActive="store.page === PAGES_NAME.about"/>
    <div class="Index__previews">
      <Galery 
        :current="current" 
        :isFull="store.hasOpenedProject()" 
        :titleIsHovered="store.titleIsHovered"
      />
      <ActiveTitle
        v-if="projects.length"
        :current="current"
        :projects="projects"
        @hover="hoveringTitle"
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

export default {
  name: 'Index',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME: PAGES_NAME,
      hasOpenedProject: false,
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
    hoveringTitle(value) {
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
    overflow: hidden;

    &__previews {
      height: 100vh;
      width: 100%;
      top: 0;
      left: 0;
      display: block;
      position: absolute;
      z-index: 1;
    }

    &__projects {
      position: relative;
      top: 0;
      z-index: 10;
    }

    &__previews,
    &__projects,
    .ActiveTitle,
    .ActiveTitle__number,
    .Galery {
      transition: transform $easing $cbezier1, opacity $easing $cbezier1;
    }
  }

  .Index.project--open {
    max-height: fit-content;

    .ActiveTitle {
      transform: translateY(-15%);
    }

    .ActiveTitle__number {
      transform: translateY(-10vh);
    }

    .Index__projects {
      transform: translateY(-30vh);
    }

    .ActiveTitle .SlidingTitle a {
      color: $white;
    }
  }

  .Index.grid--open .GridTitles,
  .Index.home--open .ActiveTitle {
    z-index: 60;
  }


  .Index.about--open {
    @include phone {
      max-height: fit-content;
    }

    .About {
      pointer-events: auto;
    }
  }
</style>