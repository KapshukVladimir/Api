import { AbstractComponent } from './abstract.component.js';
import { ListItemComponent } from './list-item.component.js';
import { renderElement, insertPosition } from '../../utils.js';
import { ErrorComponent } from './error.component.js';
import { LoadMoreComponent } from './load-more.component.js';

export class ListComponent extends AbstractComponent {
  constructor() {
    super();
  }
  _afterCreate() {

  }
  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    return errorComponent.getElement();
  }
  createListItem(element) {
    const listItemComponent = new ListItemComponent(element),
      listItemElement = listItemComponent.getElement();
    renderElement(this.getElement(), listItemElement, insertPosition.BEFORE_END);

    return listItemElement;
  }

  _render({data}) {
    this.getElement().innerHTML = "";

    window.localData.fetchUrl()
      .then(res => res.json())
      .then(dataArray => {

        const element = dataArray.filter(el => el.name.toLowerCase().match(data));

        if (element.length) {
          element.forEach((element,index) => {
            this.createListItem(element);
              this.createLinkLoadMore();


            this.getElement().firstChild.scrollIntoView({block: "start", behavior: "smooth"});
          });
        }else {
          renderElement(this.getElement(), this.createListErrorItem(), insertPosition.BEFORE_END);
        }
      });


  }
  createLinkLoadMore() {
    const loadMoreComponent = new LoadMoreComponent();
    const loadMoreElement = loadMoreComponent.getElement();
    console.log(loadMoreElement)
    renderElement(this.getElement(), loadMoreElement, insertPosition.BEFORE_END)
  }
  addEventListeners() {
    window.addEventListener('update-input', this._dataChange.bind(this));
  }
  _dataChange(event) {
    this._render(event.detail);
  }
  _getTemplate() {
    return (`<ul class="list scroll-to-list"></ul>`)
  }
}
