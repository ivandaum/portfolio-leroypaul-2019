<template>
  <div class="Home container-fluid">
    <div class="projects" v-for="(project, i) in projects" :key="i" v-show="i == current">
      <ProjectTitle :title="project.title" />
    </div>
  </div>
</template>

<script>
import store from './../store/store';
import ProjectTitle from '../components/ProjectTitle.vue';

export default {
  name:'Home',
  data() {
      return {
        projects: [],
        current: 0,
      }
  },
  mounted() {
    console.log('home mounted');

    this.projects = store.$get('projects');
  },
  components: {
    ProjectTitle,
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .Home {
    color: $white;
  }
</style>