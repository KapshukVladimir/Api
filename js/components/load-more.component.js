import { AbstractComponent } from './abstract.component.js';
import { ErrorComponent } from './error.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class LoadMoreComponent extends AbstractComponent {
  constructor(array) {
    super();
    this._array = array;
  }

  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    const errorElement = errorComponent.getElement();
    renderElement(this.getList(), errorElement, insertPosition.BEFORE_END);
  }

  _loadMore(e){
    e.preventDefault();
    const currentPerPage = window.localData.requestSettings.per_page;

    if (this._array.length === currentPerPage) {
      this.createListErrorItem();
      this.getElement().setAttribute('disabled','disabled');
    }else {
      localData.setNewPage();
      localData.getRequestUrl();
    }
  }

  getList () {
    return document.querySelector('.list');
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._loadMore.bind(this));
  }

  _getTemplate() {
    return (`<button type="button" class="load-more">Load More</button>`)
  }
}
