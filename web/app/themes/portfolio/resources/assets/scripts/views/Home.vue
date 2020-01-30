<template>
  <div class="Home container-fluid" 
    :class="{
      'project-open': store.page === PAGES_NAME.slug,
      'grid-open': store.page === PAGES_NAME.grid,
      'home-open': store.page === PAGES_NAME.home,
    }" 
    v-if="projects.length"
  >
    <div class="Home__previews is-relative">
      <Galery
        :current="current"
        :projects="projects"
      />
      <ActiveTitle
        :current="current"
        :projects="projects"
      />

      <GridTitles
        :current="current"
        :projects="projects"
      />
    </div>
      <div class="Home__projects">
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
import Galery from '../components/Galery.vue';
import ActiveTitle from '../components/ActiveTitle.vue';
import GridTitles from '../components/GridTitles.vue';
import store from './../store/store';
import Project from '../views/Project.vue';

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME:PAGES_NAME,
      hasOpenedProject: false,
      store: store,
    }
  },
  mounted() {
    store.$on('projectsLoaded', () => {
      const projects = store.projects;
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
    });

    store.$on('switchProject', (value) => {
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
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";
  @import "../../styles/conf/mixins";

  .Home {
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
      transition: transform $easing $cbezier1 0s;
    }

    &.project-open {
      max-height: fit-content;

      .Home__previews {
        transform: scaleY(0.5) translateY(-50vh);
        .ActiveTitle,
        .Galery {
          transform: scaleY(2);

          .Galery__picture {
            transform: rotate(0deg);
          }
        }
      }
      .Home__projects {
        transform: translateY(-50vh);
      }
    }

    &.grid-open .GridTitles,
    &.home-open .ActiveTitle {
      z-index: 60;
    }
  }
</style>