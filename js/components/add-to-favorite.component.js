import { AbstractComponent } from './abstract.component.js';
import {  addToFavorites, removeFromFavorites } from '../../utils.js';

export class AddToFavoriteComponent extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }

  _addToFavorites(){
    this._item.btnState = !this._item.btnState;
    window.secondFetchArray = window.arrayFromUrl;
    window.arrayOfFavorites = [...window.arrayOfFavorites, this._item];
    localStorage.setItem('arrayOfFavorites', JSON.stringify(window.arrayOfFavorites));

    window.localData.updateFavorites(window.arrayOfFavorites);
    window.localData.changeStateBtn(window.incomingArray, this._item);
  }

  _removeFromFavorites() {
    localStorage.removeItem('arrayOfFavorites');
    this._item.btnState = !this._item.btnState;

    window.localData.removeFromFavorites(this._item);
    window.localData.changeStateBtn(window.incomingArray, this._item);
    window.localData.updateFavorites(window.arrayOfFavorites);
  }

  addEventListeners() {
    const addBtn = this.getElement();

    if (this._item.btnState){
      addToFavorites(addBtn);
      addBtn.addEventListener('click', this._addToFavorites.bind(this));
   }else {
      removeFromFavorites(addBtn);
      addBtn.addEventListener('click', this._removeFromFavorites.bind(this));
    }
  }

  _getTemplate() {
    return (`<button class="add-favorite">Add to favorites</button>`)
  }
}
