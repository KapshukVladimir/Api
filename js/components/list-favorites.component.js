import { AbstractComponent } from './abstract.component.js';
import { ListItemComponent } from './list-item.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class ListFavoritesComponent extends AbstractComponent {
  constructor(array) {
    super();
    this.array = array
  }

  createListItem(element) {
    const listItemComponent = new ListItemComponent(element),
      listItemElement = listItemComponent.getElement();

    renderElement(this.getElement(), listItemElement, insertPosition.BEFORE_BEGIN);
    listItemComponent.addEventListeners();

    return listItemElement;
  }

  renderSingleItem(array) {
    array.forEach(el => {
      this.createListItem(el);
    });
  }

  _render() {
    window.arrayOfFavorites.forEach(el => {
      this.createListItem(el);
    })
  }

  _afterCreate() {

    if (this.array.length) {
      this.renderSingleItem(this.array);
    }else {
      this._render();
    }
  }

  _getTemplate() {
    return (`<ul class="list-of-favorites"></ul>`)
  }
}
