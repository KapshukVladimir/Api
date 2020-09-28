import { AbstractComponent } from './abstract.component.js';
import { ListComponent } from './list.component.js';
import { insertPosition, BODY_ELEMENT, renderElement } from '../../utils.js';
import { ListFavoritesComponent } from './list-favorites.component.js';


export class ModalWindowComponent extends AbstractComponent {
  constructor(arrayOfFavorites) {
    super();
    this._arrayOfFavorites = arrayOfFavorites;
  }

  // createList() {
  //   this.getElement().firstChild.nextSibling.innerHTML = '';
  //   const listComponent = new ListComponent(this._arrayOfFavorites),
  //     listElement = listComponent.getElement();
  //   renderElement(this.getElement().firstChild.nextSibling, listElement, insertPosition.BEFORE_BEGIN);
  //   window.state = 'remove';
  // }
  createListOfFavorites() {
    this.getElement().firstChild.nextSibling.innerHTML = '';

    const listFavoritesComponent = new ListFavoritesComponent(this._arrayOfFavorites),
      listFavoritesElement = listFavoritesComponent.getElement();
    renderElement(this.getElement().firstChild.nextSibling, listFavoritesElement, insertPosition.BEFORE_BEGIN);
    window.state = 'remove';
  }
  _closeModal(e) {

    if (e.target === this.getElement()) {
      BODY_ELEMENT.style.overflowY = "scroll";
      e.target.style.display = "none";
    }
    if (window.arrayOfFavorites.length === 0) {
      BODY_ELEMENT.style.overflowY = "scroll";
      this.getElement().style.display = 'none';
    }
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._closeModal.bind(this));
    window.addEventListener('update-favorites', this._changeData.bind(this));
    window.addEventListener('update-modal', this._changeData.bind(this));
  }
  _changeData(event) {
    this.createListOfFavorites(event.detail.data);
  }
  _afterCreate() {
    this.getElement().firstChild.nextElementSibling.style.overflowY = 'scroll';
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
