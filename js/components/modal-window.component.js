import { AbstractComponent } from './abstract.component.js';
import { ListComponent } from './list.component.js';
import { insertPosition, BODY_ELEMENT, renderElement } from '../../utils.js';


export class ModalWindowComponent extends AbstractComponent {
  constructor(arrayOfFavorites) {
    super();
    this._arrayOfFavorites = arrayOfFavorites;
  }

  createList() {
    this.getElement().firstChild.nextSibling.innerHTML = '';
    const listComponent = new ListComponent(this._arrayOfFavorites),
      listElement = listComponent.getElement();
    renderElement(this.getElement().firstChild.nextSibling, listElement, insertPosition.BEFORE_BEGIN);
    window.state = 'remove';
  }
  _closeModal(e) {

    if (e.target === this.getElement()) {
      BODY_ELEMENT.style.overflowY = "scroll";
      e.target.style.display = "none";
    }
    if (this._arrayOfFavorites.length === 0) {
      this.getElement().style.display = 'none';
    }
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._closeModal.bind(this));
    window.addEventListener('update-favorites', this._changeData.bind(this));
    window.addEventListener('update-modal', this._changeData.bind(this));
  }
  _changeData(event) {
    this.createList(event.detail.data);
  }
  _afterCreate() {
    this.getElement().firstChild.nextElementSibling.style.overflowY = 'scroll';
    this.getElement().firstChild.nextElementSibling.style.height = '600px';
    this.createList();
  }

  _getTemplate() {
    return (`<div class="overlay">
                <div class="modal-wrapper">
                </div>
            </div>`)
  }
}
