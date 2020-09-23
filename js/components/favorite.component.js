import { AbstractComponent } from './abstract.component.js';

export class FavoriteComponent extends AbstractComponent {

  _addToFavorites(e){
    e.preventDefault();
    console.log('add');
  }


  addEventListeners() {
    this.getElement().addEventListener('click', this._addToFavorites.bind(this));
    window.addEventListener('update-counter', this._dataChange.bind(this));
  }

  _dataChange(event) {
    window.counterOfFavorites = event.detail.data;
    console.log('counter', window.counterOfFavorites);
  }

  _getTemplate() {
    return (`<button class="favorites-btn">
                 Favorites (${window.counterOfFavorites})
             </button>`)
  }
}
