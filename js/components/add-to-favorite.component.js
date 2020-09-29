import { AbstractComponent } from './abstract.component.js';

export class AddToFavoriteComponent extends AbstractComponent {
constructor(item) {
  super();
  this._item = item;
}

  _addToFavorites(){
    this._item.btnState = !this._item.btnState;
    window.secondFetchArray = window.arrayFromUrl;
    window.arrayOfFavorites.push(this._item);
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

   if (this._item.btnState){
      this.getElement().classList.remove('remove');
      this.getElement().classList.add('add');
      this.getElement().innerText = 'Add to Favorites';
      this.getElement().addEventListener('click', this._addToFavorites.bind(this));
   }else {
     this.getElement().classList.remove('add');
      this.getElement().classList.add('remove');
      this.getElement().innerText = 'Remove';
      this.getElement().addEventListener('click', this._removeFromFavorites.bind(this));
    }
  }

  _getTemplate() {
    return (`<button class="add-favorite ${window.state}">Add to favorites</button>`)
  }
}
