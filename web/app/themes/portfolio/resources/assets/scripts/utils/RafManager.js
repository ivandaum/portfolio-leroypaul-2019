class RafManager {
  constructor() {
    this.callbacks = [];
    this.raf = [];
    
    this.render();
  }

  addQueue(func) {
    this.callbacks.push(func);
    return this.callbacks.length;
  }

  removeQueue(index) {
    if (this.callbacks[index]) {
      this.callbacks.splice(index, 1);
      return true;
    }

    return false;
  }

  render(delta) {
    this.raf = window.requestAnimationFrame(this.render.bind(this));

    this.callbacks.map( func => {
      if (typeof func == 'function') {
        func(delta);
      }
    });
  }

  stop() {
    window.cancelAnimationFrame(this.raf);
    this.raf = null;
  }
}

export default new RafManager;
