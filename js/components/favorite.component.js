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
  }

  _showModal(e){
    e.preventDefault();
    this.createModalWindow();
  }


  addEventListeners() {
    this.getElement().addEventListener('click', this._showModal.bind(this));

  }




  _getTemplate() {
    return (`<button class="favorites-btn">
                 Favorites (${window.counterOfFavorites})
             </button>`)
  }
}
