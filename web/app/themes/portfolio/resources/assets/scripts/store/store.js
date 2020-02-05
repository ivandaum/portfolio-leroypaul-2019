import { PAGES_NAME } from './../utils/constants';

export default {
  datas: [],
  events: [],
  project: 0,
  scroll: 0,
  projectScrolled: false,
  scrollDirection: 1,
  page: null,
  $scrollContainer: {},
  $save(obj){
    for(let name in obj) {
      this.datas[name] = obj[name];
    }
  },
  $get(name) {
    return this.datas[name];
  },
  $emit(evtName, value) {
    if(this.events[evtName]) {
      for(let i = 0; i<this.events[evtName].length; i++) {
        this.events[evtName][i](value);
      }
    }
  },
  $on(evtName, func) {
    if(!this.events[evtName]) {
      this.events[evtName] = [];
    }
    this.events[evtName].push(func);
  },
  isProjectOpen(slug) {
    return this.page === PAGES_NAME.slug && this.slug == slug;
  },
  hasOpenedProject() {
    return this.page === PAGES_NAME.slug && this.slug !== null;
  },
  getNextProject(direction) {
    const length = this.projects.length;
    let next = this.project + direction; 

    if(next > length - 1) {
      next = 0;
    } else if (next < 0) {
      next = length - 1;
    }

    return next;
  }
}