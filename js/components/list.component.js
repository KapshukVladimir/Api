import { AbstractComponent } from './abstract.component.js';
import { ListItemComponent } from './list-item.component.js';
import { renderElement, insertPosition } from '../../utils.js';
import { ErrorComponent } from './error.component.js';
import { LoadMoreComponent } from './load-more.component.js';


export class ListComponent extends AbstractComponent {

  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    return errorComponent.getElement();
  }

  createListItem(element) {
    const listItemComponent = new ListItemComponent(element),
      listItemElement = listItemComponent.getElement();
    renderElement(this.getElement(), listItemElement, insertPosition.BEFORE_BEGIN);

    return listItemElement;
  }

  _render({data}) {
    const inputValue = data;
    this.getElement().innerHTML = "";

    window.localData.fetchUrl()
      .then(res => res.json())
      .then(dataArray => {

        const element = dataArray.filter(el => el.name.toLowerCase().match(inputValue));

        if (element.length) {
          element.forEach((el) => {
            this.createListItem(el);
            this.getElement().firstChild.scrollIntoView({block: "start"});

          });
          this.createLinkLoadMore(element);
        }else {
          renderElement(this.getElement(), this.createListErrorItem(), insertPosition.BEFORE_END);
        }
      });
  }
  createLinkLoadMore(array) {
    const loadMoreComponent = new LoadMoreComponent(array);
    const loadMoreElement = loadMoreComponent.getElement();
    renderElement(this.getElement(), loadMoreElement, insertPosition.BEFORE_END);
    loadMoreComponent.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('update-input', this._dataChange.bind(this));
    window.addEventListener('update', this._dataChange.bind(this));
  }

  _dataChange(event) {
    this._render(event.detail);
  }

  _getTemplate() {
    return (`<ul class="list scroll-to-list"></ul>`)
  }
}
