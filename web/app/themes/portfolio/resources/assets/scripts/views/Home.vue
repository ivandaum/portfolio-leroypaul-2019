<template>
  <div class="Home container-fluid" :class="{'project-open': store.hasOpenedProject()}">
    <div class="Home__previews is-relative">
      <Galery
        :current="current"
        :projects="projects"
      />
      <ActiveTitle
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
            :isOpen="store.isProjectOpen(project.slug)"
            v-show="store.isProjectOpen(project.slug)"
            :index="i"
          />
        </transition-group>
      </div>
  </div>
</template>

<script>
import { PAGES_NAME } from './../utils/constants';
import Galery from '../components/Galery.vue';
import ActiveTitle from '../components/ActiveTitle.vue';
import store from './../store/store';
import Project from '../views/Project.vue';
// import Grid from '../views/Grid.vue';

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
    // Grid,
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
      transition: height $easing $cbezier1;
    }

    &.project-open &__previews {
      height: 50vh;
    }

    &.project-open {
      max-height: fit-content;
    }
  }
</style>