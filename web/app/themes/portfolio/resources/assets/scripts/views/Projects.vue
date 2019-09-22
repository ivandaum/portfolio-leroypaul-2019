<template>
  <div class="Projects container-fluid">
    <div class="Projects__project" v-for="(project, i) in projects" :key="i" :class="{isActive: i == current}">
      <div class="Projects__project--header">
        <div class="Projects__project--title">
          <transition name="slide-in">
            <SlidingTitle :title="project.title" :isActive="i == current" v-show="i == current" />
          </transition>
        </div>
      </div>
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
        current: 1,
      }
  },
  mounted() {
    store.$on('projectsLoaded', () => {
      const projects = store.$get('projects');
      for(let i = 0; i < projects.length; i++) {
        this.$set(this.projects, i, projects[i]);
      }
    })

    setInterval( () => {
      if(this.current + 1 > this.projects.length - 1) {
        this.current = 0;
      } else {
        this.current++;
      }
    }, 3000);
  },
  components: {
    SlidingTitle,
    Project,
  },
}
</script>
<style lang="scss">
  @import "../../styles/conf/variables";

  .Projects__project {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    &.isActive {
      z-index: 2;
      pointer-events: auto;
    }

    &--header {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      height: 100vh;
      width: 100%;
    }

    &--title {
      width: 100%;
      height: $title-height;
      overflow: hidden;
      position: relative;
      pointer-events: none;
    }
  }
</style>