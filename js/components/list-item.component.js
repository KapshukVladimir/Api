import { AbstractComponent } from './abstract.component.js';
import { toggleClass } from '../../utils.js';

export class ListItemComponent extends AbstractComponent {
  constructor({ image_url, name, description, target_fg}) {
    super();
    this._image_url = image_url;
    this._name = name;
    this._description = description;
    this._target_fg = target_fg;
    window.counterOfFavorites = 0;
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
