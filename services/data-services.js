export class LocalData {

  update() {
    this.emitEvent('update');
  }

  requestSettings = {
    page: 1,
    per_page: 5,
  };
  getRequestUrl() {
    return `https://api.punkapi.com/v2/beers?page=${this.requestSettings.page}&per_page=${this.requestSettings.per_page}`
  }
  setNewPage() {
    this.requestSettings.per_page+=2;
    this.emitEvent('update');
  }
  async fetchUrl() {
    return await fetch(this.getRequestUrl());
  }

  emitEvent(type, data) {
    window.dispatchEvent(new CustomEvent(type, {
      detail: {
        data
      }
    }))
  }
}
