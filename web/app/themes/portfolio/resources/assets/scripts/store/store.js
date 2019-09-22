export default {
  datas: [],
  $save(obj){
    for(let name in obj) {
      console.log('-- saved : ' + name);
      this.datas[name] = obj[name];
    }
  },
  $get(name) {
    return this.datas[name];
  },
}