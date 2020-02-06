<template>
  <div class="Index container-fluid js-scroller" 
    :class="{
      'project--open': store.page === PAGES_NAME.slug,
      'project--scrolled': store.scroll > store.windowHeight && store.page === PAGES_NAME.slug,
      'project--preload-next': store.projectScrolled,
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
      />
      <ActiveTitle
        v-if="projects.length"
        :current="current"
        :projects="projects"
        @hover="titleIsHovered"
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

      <div class="Index__footer">
        <!-- <transition :name="'fade'">
          <p v-show="store.page === PAGES_NAME.home">Digital Designer</p>
        </transition> -->
        <transition :name="'fade'">
          <p v-show="store.page === PAGES_NAME.home">Folio 18 - 20</p>
        </transition>
      </div>
  </div>
</template>

<script>
import { PAGES_NAME } from './../utils/constants';
import store from './../store/store';
import { scrollTo } from './../utils/functions';

import Galery from '../components/home/Galery.vue';
import ActiveTitle from '../components/home/ActiveTitle.vue';
import GridTitles from '../components/home/GridTitles.vue';
import Project from '../components/pages/Project.vue';
import About from '../components/pages/About.vue';
import RafManager from '../utils/RafManager';

export default {
  name: 'Index',
  data() {
    return {
      projects: [],
      current: -1,
      PAGES_NAME: PAGES_NAME,
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
      this.$preview = this.$el.querySelector('.js-stuck-on-scroll');
    });

    store.$on('switch-project', (value) => {
      this.current = value;
      store.project = value;
    });

  },
  beforeRouteUpdate: (to, from, next) => {
    const goTo = store.$scroller.offsetHeight - store.windowHeight;

    function projectToProject(goTo, next) {
      // close active project
      const index = store.project + 1;
      const $project = document.querySelector('.Project.isOpen');
      if ($project) $project.style.display = 'none';

      store.$scrollContainer.scrollTo(0, goTo);
      store.scroll = 0;
      next();
    }

    if (goTo !== store.scroll) {
      scrollTo(goTo, store.$scrollContainer, () => {
        setTimeout(() => projectToProject(goTo, next), 200);
      });
    } else {
      projectToProject(goTo, next);
    }
  },
  methods: {
    isActive(index) {
      if(store.page === PAGES_NAME.grid) return false;
      return index == this.current
    },
    titleIsHovered(value) {
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

    &:not(.project--open) {
      overflow: hidden;
    }

    &__previews {
      height: 100vh;
      width: 100%;
      display: block;
      z-index: 1;
      position: sticky;
      top: 0;
    }

    &__projects {
      position: relative;
      top: 0;
      z-index: 10;
      transform: translateY(-100vh);
    }

    &__footer {
      position: fixed;
      bottom: 0;
      display: flex;
      padding: 0 10rem 5rem 10rem;
      justify-content: flex-end;
      z-index: 30;
      font-weight: bold;
      width: 100%;
      left: 0;
      pointer-events: none;

      p {
        font-size: 1.4rem;
        margin: 0;
      }
      @include tablet {
        padding: 0 5rem 4rem 5rem;
      }

      @include phone {
        padding: 0 2.4rem 3rem 2.4rem;
      }
    }

    .ActiveTitle,
    .ActiveTitle__number,
    .Galery {
      transition: transform $easing $cbezier1, opacity $easing $cbezier1;
    }

    .Project {
      margin-top: 100vh;
      transition: margin $easing $cbezier1;
    }
  }

  // ON PROJECT OPEN
  .Index.project--open {
    max-height: fit-content;

    .Project.isOpen {
      margin-top: 70vh;
    }

    .ActiveTitle {
      z-index: 15;
    }

    &:not(.project--preload-next) {
      .ActiveTitle {
        transform: translateY(-10%);
      }

      .ActiveTitle__number {
        transform: translateY(-5vh);
      }

      .ActiveTitle .SlidingTitle a {
        color: $white;
      }
    }
  }

  // Hide current picture instantly when scrolled further than cover
  .Index.project--scrolled .Galery__picture.isActiveProjectCover {
    opacity: 0;
  }

  .Index.grid--open .GridTitles,
  .Index.home--open .ActiveTitle {
    z-index: 60;
  }

  .Index.about--open .About {
    pointer-events: auto;
  }
</style>