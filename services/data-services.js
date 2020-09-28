export class LocalData {

  update() {
    this.emitEvent('update');
  }
  loadMore(array) {
    console.log('array', array);
    console.log('second fetch', secondFetchArray);
    this.emitEvent('load-more', array);
  }
  updateError(array) {
    this.emitEvent('update-error', array);
  }
  changeStateBtn(array, item) {
    array = array.filter(el => el !== item.id);

    this.emitEvent('change-state', array);
  }

  removeFromFavorites(item) {
    window.arrayOfFavorites = window.arrayOfFavorites.filter(el => el.id !== item.id );
    this.emitEvent('delete-from-favorites', window.arrayOfFavorites);
  }

  updateFavorites(array){
    console.log('update favorites', array)
    this.emitEvent('update-favorites', array)
  }
  requestSettings = {
    page: 1,
    per_page: 50,
    beer_name: "",
  };
  getRequestUrl() {
    return `https://api.punkapi.com/v2/beers?page=${this.requestSettings.page}&per_page=${this.requestSettings.per_page}&beer_name=${this.requestSettings.beer_name}`
  }
  async setNewPage() {
    this.requestSettings.page += 2;
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
