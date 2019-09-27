<template>
  <div class="Home container-fluid">
    <Grid :projects="projects" :isGrid="grid" :current="current" />
    <Project 
      v-for="(project, i) in projects" 
      :key="'content-' + i" 
      :data="project" 
      :isGrid="grid"
      :isActive="isActive(i)" 
      :isOpen="isOpen(project.slug)" 
      :index="i"
    />
  </div>
</template>

<script>
import store from './../store/store';
import Project from '../views/Project.vue';
import Grid from '../views/Grid.vue';

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      current: 2,
      slug: '',
      grid: false,
    }
  },
  watch:{
    $route (to, from){
      this.grid = this.$route.params.grid;
      this.slug = this.$route.params.slug;
    }
  },
  mounted() {
    this.grid = this.$route.params.grid;
    this.slug = this.$route.params.slug;

    store.$on('projectsLoaded', () => {
      const projects = store.$get('projects');
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
    })

    // setInterval( () => {
    //   if(this.current + 1 > this.projects.length - 1) {
    //     this.current = 0;
    //   } else {
    //     this.current++;
    //   }
    // }, 3000);
  },
  methods: {
    isActive(index) {
      if(this.grid) return false;
      return index == this.current;
    },
    isOpen(slug) {
      if(this.grid) return false;
      return slug == this.slug;
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