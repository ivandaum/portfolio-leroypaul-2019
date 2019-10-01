<template>
  <div class="Home container-fluid">
    <Project 
      v-for="(project, i) in projects" 
      :key="'content-' + i" 
      :data="project" 
      :isActive="isActive(i)" 
      :isOpen="isOpen(project.slug)" 
      :index="i"
    />
    <Grid v-if="projects.length" :projects="projects" v-show="store.page === PAGES_NAME.grid" :current="current" />
  </div>
</template>

<script>
import store from './../store/store';
import { PAGES_NAME } from './../utils/constants';
import Project from '../views/Project.vue';
import Grid from '../views/Grid.vue';

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME:PAGES_NAME,
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
    isOpen(slug) {
      if(store.page === PAGES_NAME.grid) return false;
      return store.page === PAGES_NAME.slug && store.slug == slug;
    }
  },
  components: {
    Project,
    Grid,
  },
}
</script>
<style lang="scss">
  .Home {
    overflow-y: scroll;
    position: absolute;
    top: 0;
    min-height: 100vh;
  }
</style>