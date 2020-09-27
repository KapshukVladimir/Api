import { AbstractComponent } from './abstract.component.js';
import { ErrorComponent } from './error.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class LoadMoreComponent extends AbstractComponent {
  constructor(array) {
    super();
    this._array = array;
    this._error = this.createListErrorItem();
  }

  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    return errorComponent.getElement();
  }

  async _loadMore() {
    await window.localData.setNewPage();
    await window.localData.fetchUrl()
      .then(res => res.json())
      .then(array => {
        array.forEach(el => {
          el.btnState = true;
        })
        window.arrayFromUrl = [...array]; // потом добавить  ...window.arrayOfFavorites
        if (window.arrayFromUrl.length === window.localData.requestSettings.per_page) {
          renderElement(this.getList(), this._error, insertPosition.BEFORE_END);
          this.getElement().setAttribute('disabled', 'true');
          window.localData.updateError(window.arrayFromUrl);
        }
      }).then(() => window.localData.loadMore(window.arrayFromUrl))

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
