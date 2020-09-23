import { AbstractComponent } from './abstract.component.js';
import { ListComponent } from './list.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class ModalWindowComponent extends AbstractComponent {
  constructor(arrayOfFavorites) {
    super();
    this.arrayOfFavorites = arrayOfFavorites;
  }

  createList() {
    const listComponent = new ListComponent(this.arrayOfFavorites),
      listElement = listComponent.getElement();
    renderElement(this.getElement().firstChild.nextSibling, listElement, insertPosition.BEFORE_BEGIN);
  }
  _afterCreate() {
    this.createList();
  }

  _getTemplate() {
    return (`<div class="overlay">
                <div class="modal-wrapper">
                </div>
            </div>`)
  }
}
