export class LocalData {

  update() {
    this.emitEvent('update');
  }

  loadMore(array) {
    this.emitEvent('load-more', array);
  }

  updateError(array) {
    this.emitEvent('update-error', array);
  }

  changeStateBtn(array, item) {

    if (array) {
      array = array.filter(el => el !== item.id);
    }
    this.emitEvent('change-state', array);
  }

  removeFromFavorites(item) {

    if (window.arrayOfFavorites) {
      window.arrayOfFavorites = window.arrayOfFavorites.filter(el => el.id !== item.id);
    }
    localStorage.removeItem('arrayOfRecent');
    this.emitEvent('delete-from-favorites', window.arrayOfFavorites);
  }

  updateFavorites(array){
    this.emitEvent('update-favorites', array)
  }

  requestSettings = {
    page: 1,
    per_page: 2,
    beer_name: "",
  };

  getRequestUrl() {
    return `https://api.punkapi.com/v2/beers?page=${this.requestSettings.page}&per_page=${this.requestSettings.per_page}&beer_name=${this.requestSettings.beer_name}`
  }

  async setNewPage() {
    this.requestSettings.page++;
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
