<template>
  <div class="Home container-fluid">
    <Project :data="project" :isOpen="project.slug == slug" :index="i" :isGrid="grid" :isTitleActive="i == current && !slug" v-for="(project, i) in projects" :key="i"/>
  </div>
</template>

<script>
import store from './../store/store';
import Project from '../components/Project.vue';

export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      current: 0,
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
    toggleProjects(show) {

    }
  },
  components: {
    Project,
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