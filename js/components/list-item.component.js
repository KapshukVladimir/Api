import { AbstractComponent } from './abstract.component.js';
import { BODY_ELEMENT, insertPosition, renderElement } from '../../utils.js';
import { AddToFavoriteComponent } from './add-to-favorite.component.js';
import { ModalWindowComponent } from './modal-window.component.js';

export class ListItemComponent extends AbstractComponent {
  constructor(item) {
    super();
    this.item = item;
    this._image_url = item.image_url;
    this._name = item.name;
    this._description = item.description;
    this._target_fg = item.target_fg;
  }
  createModalWindow(item) {
    let array = [];
    array = [...array, item];
    const modalWindowComponent = new ModalWindowComponent(array),
      modalWindowElement = modalWindowComponent.getElement();
    renderElement(BODY_ELEMENT, modalWindowElement, insertPosition.BEFORE_BEGIN);
    modalWindowComponent.addEventListeners();

    return modalWindowElement.firstChild.nextSibling;
  }

  _showItem() {
    if (this.getModal()) {
      this.getModal().remove();
    }
    this.createModalWindow(this.item);
  }
  getModal() {
    return document.querySelector('.overlay');
  }
  addEventListeners() {
    this.getTitle().addEventListener('click', this._showItem.bind(this));
  }

  _afterCreate() {
    this._render();
  }

  _render() {
    const buttonComponent = new AddToFavoriteComponent(this.item);
    const buttonElement = buttonComponent.getElement();
    renderElement(this._getText(),buttonElement, insertPosition.BEFORE_END);
    buttonComponent.addEventListeners();
  }

  getTitle() {
    return this._getText().querySelector('.title');
  }

  _getText() {
    return this.getElement().querySelector('.text');
  }

  _getTemplate() {
    return (`<li class="list-item">
                <div class="item-content">
                    <div class="img">
                        <img src="${this._image_url}" alt="image">
                    </div>
                    <div class="text">
                        <h3 class="title">${this._name}</h3>
                        <h4>${this._description}</h4>
                        <h3>Price: ${this._target_fg}&#8372;</h3>
                    </div>
                </div>
            </li>`);
  }
}
