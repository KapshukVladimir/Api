import { AbstractComponent } from './abstract.component.js';
import { ListItemComponent } from './list-item.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class ListFavoritesComponent extends AbstractComponent {

  constructor() {
    super();
  }
  createListItem(element) {

    const listItemComponent = new ListItemComponent(element),
      listItemElement = listItemComponent.getElement();
    renderElement(this.getElement(), listItemElement, insertPosition.BEFORE_BEGIN);
    listItemComponent.addEventListeners();

    return listItemElement;
  }
  _render() {
    window.arrayOfFavorites.forEach(el => {
      this.createListItem(el);
    })
  }
  _afterCreate() {
    this._render();
  }

  _getTemplate() {
    return (`<ul class="list-of-favorites"></ul>`)
  }
}
