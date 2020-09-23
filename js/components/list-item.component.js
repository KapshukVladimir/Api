import { AbstractComponent } from './abstract.component.js';
import { toggleClass } from '../../utils.js';

export class ListItemComponent extends AbstractComponent {
  constructor(item) {
    super();
    this.item = item;
    this._image_url = item.image_url;
    this._name = item.name;
    this._description = item.description;
    this._target_fg = item.target_fg;
    window.counterOfFavorites = 0;
    window.arrayOfFavorites = []

  }
  getAddBtnFavorite() {
    if (this.getElement().querySelector('.add')) {
      return this.getElement().querySelector('.add');
    }else {
      return this.getElement().querySelector('.remove');
    }
  }
  changeFavorite() {
    if (this.getAddBtnFavorite().classList.contains('add')) {
      window.counterOfFavorites++;
      localData.emitEvent('update-counter', window.counterOfFavorites);
      toggleClass(this.getAddBtnFavorite(), 'add', 'remove', "Delete");

      window.arrayOfFavorites.push(this.item);

    } else {
      toggleClass(this.getAddBtnFavorite(), 'remove', 'add', "Add to favorites");
      window.counterOfFavorites--;
      localData.emitEvent('update-counter', window.counterOfFavorites);
    }
  }

  _addToFavorites(e){
    e.preventDefault();
    this.changeFavorite.call(this);
  }

  addEventListeners() {
    this.getAddBtnFavorite().addEventListener('click', this._addToFavorites.bind(this));
  }
  _getTemplate() {
    return (`<li class="list-item">
                <div class="item-content">
                    <div class="img">
                        <img src="${this._image_url}" alt="image">
                    </div>
                    <div class="text">
                        <h3>${this._name}</h3>
                        <h4>${this._description}</h4>
                        <h3>Price: ${this._target_fg}&#8372;</h3>
                        <button class="add-favorite add">Add to favorites</button>
                    </div>
                </div>
            </li>`);
  }
}
