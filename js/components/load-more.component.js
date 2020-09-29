import { AbstractComponent } from './abstract.component.js';
import { ErrorComponent } from './error.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class LoadMoreComponent extends AbstractComponent {

  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    return errorComponent.getElement();
  }

  async _loadMore() {

    await window.localData.setNewPage();

    await window.localData.fetchUrl()
      .then(res => res.json())
      .then(array => {
        window.secondFetchArray = array;
        window.secondFetchArray.forEach(el => {
          el.btnState = true;
        });

        if (window.arrayFromUrl.length !== array.length) {
          renderElement(this.getSectionLoadMore(), this.createListErrorItem(), insertPosition.BEFORE_END);
          this.getElement().setAttribute('disabled', 'true');
          window.localData.updateError(window.arrayFromUrl);
        }else {
          window.incomingArray = [...window.secondFetchArray, ...window.incomingArray]; // потом добавить ...window.arrayOfFavorites
        }

      }).then(() => window.localData.loadMore(window.incomingArray))

  }

  getSectionLoadMore () {
    return document.querySelector('.section-load-more');
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._loadMore.bind(this));
  }

  _getTemplate() {
    return (`<button type="button" class="load-more">Load More</button>`)
  }
}
