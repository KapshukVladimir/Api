import { AbstractComponent } from './abstract.component.js';
import {toggleClass} from "../../utils.js";



export class AddToFavoriteComponent extends AbstractComponent {
constructor(item) {
  super();
  this._item = item;
}
//el.id === this._item.id &&
  _addToFavorites(e){
    console.log("window arr", window.incomingArray);

    window.arrayOfFavorites.push(this._item);
    this._item.btnState = !this._item.btnState;

    window.localData.updateFavorites(window.arrayOfFavorites);
    window.localData.changeStateBtn(window.incomingArray, this._item);

  }
  _removeFromFavorites() {
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
