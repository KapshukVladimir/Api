import { AbstractComponent } from './abstract.component.js';
import { SCROLL, NONE, ESC_KEY, insertPosition, BODY_ELEMENT, renderElement } from '../../utils.js';
import { ListFavoritesComponent } from './list-favorites.component.js';

export class ModalWindowComponent extends AbstractComponent {
  constructor(arrayOfFavorites) {
    super();
    this._arrayOfFavorites = arrayOfFavorites;
  }

  createListOfFavorites() {
    this.getElement().firstChild.nextSibling.innerHTML = '';
    const listFavoritesComponent = new ListFavoritesComponent(this._arrayOfFavorites),
      listFavoritesElement = listFavoritesComponent.getElement();
    renderElement(this.getElement().firstChild.nextSibling, listFavoritesElement, insertPosition.BEFORE_BEGIN);
  }

  _closeModal(e) {

    if (e.target === this.getElement()) {
      BODY_ELEMENT.style.overflowY = SCROLL;
      e.target.style.display = NONE;
    }

    if (window.arrayOfFavorites.length === 0) {
      BODY_ELEMENT.style.overflowY = SCROLL;
      this.getElement().style.display = NONE;
    }
    delete this.getElement()
  }

  addEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === ESC_KEY) {
        this.getElement().style.display = NONE;
      }
    });
    this.getElement().addEventListener('click', this._closeModal.bind(this));
    window.addEventListener('update-favorites', this._changeData.bind(this));
    window.addEventListener('update-modal', this._changeData.bind(this));
  }

  _changeData(event) {
    this.createListOfFavorites(event.detail.data);
  }

  _afterCreate() {
    this.getElement().firstChild.nextElementSibling.style.overflowY = SCROLL;
    this.getElement().firstChild.nextElementSibling.style.height = '600px';
    this.createListOfFavorites();
  }

  _getTemplate() {
    return (`<div class="overlay">
                <div class="modal-wrapper">
                </div>
            </div>`)
  }
}
