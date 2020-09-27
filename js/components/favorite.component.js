import { AbstractComponent } from './abstract.component.js';
import { ModalWindowComponent } from './modal-window.component.js';
import { BODY_ELEMENT, insertPosition, renderElement } from '../../utils.js';

export class FavoriteComponent extends AbstractComponent {
  constructor(ArrayOfFavorites) {
    super();
    this._ArrayOfFavorites = ArrayOfFavorites;
  }

  createModalWindow() {
    const modalWindowComponent = new ModalWindowComponent(this._ArrayOfFavorites),
      modalWindowElement = modalWindowComponent.getElement();
    renderElement(BODY_ELEMENT, modalWindowElement, insertPosition.BEFORE_BEGIN);
    modalWindowComponent.addEventListeners();
  }
  getOverlay() {
    return document.querySelector('.overlay');
  }
  _showModal(e){
    console.log('FAVORITES',this._ArrayOfFavorites);
      e.preventDefault();
    BODY_ELEMENT.style.overflowY = "hidden";
  //
    if (this.getOverlay()) {
     this.getOverlay().remove();
    }
    this.createModalWindow();

  }

  _afterCreate() {
    if (!this._ArrayOfFavorites.length) {
      this.getElement().setAttribute('disabled', 'true');
    }
  }

  addEventListeners() {
   this.getElement().addEventListener('click', this._showModal.bind(this));
  }

  _getTemplate() {
    return (`<button class="favorites-btn">
                 Favorites (${!this._ArrayOfFavorites ? 0 : this._ArrayOfFavorites.length})
             </button>`)
  }
}
