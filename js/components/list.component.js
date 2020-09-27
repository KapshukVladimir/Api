import { AbstractComponent } from './abstract.component.js';
import { ListItemComponent } from './list-item.component.js';
import { renderElement, insertPosition, MAIN_ELEMENT } from '../../utils.js';
import { ErrorComponent } from './error.component.js';
import { LoadMoreComponent } from './load-more.component.js';

export class ListComponent extends AbstractComponent {
  constructor(incomingArray) {
    super();
    this._array = incomingArray;
    window.incomingArray = incomingArray;
  }

  createListErrorItem() {
    const errorComponent = new ErrorComponent();
    return errorComponent.getElement();
  }

  createListItem(element) {

    const listItemComponent = new ListItemComponent(element),
      listItemElement = listItemComponent.getElement();
    renderElement(this.getElement(), listItemElement, insertPosition.BEFORE_BEGIN);
    listItemComponent.addEventListeners();

    return listItemElement;
  }


  _afterCreate() {
    this._render(this._array);
  }
  getBtn(){
    return this.getElement().querySelector('.add-favorite');
  }
  _render(incomingArray) {
    this.getElement().innerHTML = "";
    console.log("incoming: ", incomingArray);

      if (incomingArray !== undefined || incomingArray.length) {
        incomingArray.forEach((el) => {


          this.createListItem(el);

          // this.getElement().firstChild.scrollIntoView({block: "start"});
        });

        // if (window.localData.requestSettings.per_page !== incomingArray.length) {
        //   this.getElement().lastChild.scrollIntoView({block: "start"});
        //   renderElement(this.getElement(), this.createListErrorItem(), insertPosition.BEFORE_END);
        // }
      } else {
          // this.getElement().lastChild.scrollIntoView({block: "start"});
          renderElement(this.getElement(), this.createListErrorItem(), insertPosition.BEFORE_END);
      }
  }

  addEventListeners() {
    window.addEventListener('update-input', this._dataChange.bind(this));
    window.addEventListener('update', this._dataChange.bind(this));
    window.addEventListener('load-more', this._dataChange.bind(this));
    window.addEventListener('update-counter', this._dataChange.bind(this));
    window.addEventListener('update-error', this._dataChange.bind(this));
    window.addEventListener('change-state', this._dataChange.bind(this));
    window.addEventListener('delete-from-favorites', this._dataChange.bind(this));
  }

  _dataChange(event) {
    if (event.detail.data !== undefined){
      this._render(event.detail.data);
    }else {
      this._render(this._array);
    }
  }

  _getTemplate() {
    return (`<ul class="list scroll-to-list"></ul>`)
  }
}
