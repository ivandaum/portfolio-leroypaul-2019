import { PAGES_NAME } from './../utils/constants';

export default {
  datas: [],
  events: [],
  project: 0,
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
  }
}