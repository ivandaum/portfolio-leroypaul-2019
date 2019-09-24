<template>
  <div class="Home container-fluid">
    <div class="Home__header">
      <div class="Home__titles">
        <ProjectTitle v-for="(project, i) in projects" :index="i" :key="'title-' + i" :data="project" :isGrid="grid" :isOpen="isOpen(project.slug)" :isTitleActive="isActive(i)" />
      </div>
      <div class="Home__pictures">
        <transition name="picture-slide-in" v-for="(project, i) in projects" :key="'picture-' + i">
          <img :src="project.preview_image.sizes.large" v-show="isActive(i)" />
        </transition>
      </div>
    </div>
    <ProjectContent v-for="(project, i) in projects" :key="'content-' + i" :data="project" :isOpen="isOpen(project.slug)" :index="i"/>
  </div>
</template>

<script>
import store from './../store/store';
import ProjectContent from '../components/ProjectContent.vue';
import ProjectTitle from '../components/ProjectTitle.vue';

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
    isActive(index) {
      return index == this.current;
    },
    isOpen(slug) {
      return slug == this.slug;
    }
  },
  components: {
    ProjectContent,
    ProjectTitle
  },
}
</script>
<style lang="scss">
  .Home {
    overflow-y: scroll;
    position: absolute;
    top: 0;
    min-height: 100vh;

    &__header {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
    }

    &__titles {
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
    }

    &__pictures {
      width: 30vw;
      height: 45vw;
      max-height:70vh;
      max-width: 50vh;
      position: absolute;
      overflow: hidden;
      z-index: 1;
      transform-origin: center center;
      transform: rotate(10deg);
      pointer-events: none;
      transition: transform .5s ease-in-out;
      img {
        position: absolute;
        object-fit: cover;
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>