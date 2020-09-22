export class LocalData {


  update() {
    this.emitEvent('update');
  }


  async fetchUrl() {
    return await fetch('https://api.punkapi.com/v2/beers');
  }

  emitEvent(type, data) {
    window.dispatchEvent(new CustomEvent(type, {
      detail: {
        data
      }
    }))
  }
}
