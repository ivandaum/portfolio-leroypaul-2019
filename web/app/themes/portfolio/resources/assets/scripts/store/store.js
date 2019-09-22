export default {
  datas: [],
  events: [],
  $save(obj){
    for(let name in obj) {
      console.log('-- saved : ' + name + ' for : ', obj[name]);
      this.datas[name] = obj[name];
    }
  },
  $get(name) {
    return this.datas[name];
  },
  $emit(evtName) {
    if(this.events[evtName]) {
      for(let i = 0; i<this.events[evtName].length; i++) {
        this.events[evtName][i]();
      }
    }
  },
  $on(evtName, func) {
    if(!this.events[evtName]) {
      this.events[evtName] = [];
    }
    this.events[evtName].push(func);
  },
}