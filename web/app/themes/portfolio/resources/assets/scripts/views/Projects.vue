<template>
  <div class="Projects container-fluid">
    <div class="project container-fluid" v-for="(project, i) in projects" :key="i" v-show="i == current">
      <SlidingTitle :title="project.title"/>
      <Project :data="project" v-show="i == current && project.active"/>
    </div>
  </div>
</template>

<script>
import store from './../store/store';
import SlidingTitle from '../components/SlidingTitle.vue';
import Project from '../components/Project.vue';

export default {
  name:'Projects',
  data() {
      return {
        projects: [],
        current: 0,
      }
  },
  mounted() {
    store.$on('projectsLoaded', () => {
      const projects = store.$get('projects');
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
    })
  },
  components: {
    SlidingTitle,
    Project,
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .Projects {
    color: $white;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100vh;
    width: 100%;

    .project {
      position: absolute;
      top: 0;
    }
  }
</style>