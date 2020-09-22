import { AbstractComponent } from './abstract.component.js';
import { LocalData } from '../../services/data-services.js';
import { regExp, validValue, ENTER_KEY, MAIN_ELEMENT, insertPosition, setOutline, renderElement } from '../../utils.js';
import { ListComponent } from './list.component.js';
import { ListItemComponent } from './list-item.component.js';





export class HeaderComponent extends AbstractComponent {
  constructor() {
    super();
  }

  createListItem(element) {

    const listItemComponent = new ListItemComponent(element[0]),
      listErrorItemElement = listItemComponent.getElement();
    renderElement(this.getList(), listErrorItemElement, insertPosition.BEFORE_END);

  }

  // _isValidate() {
  //   return validValue(this.inputValue, regExp);
  // }

  getInput() {
    return document.querySelector('.input-search');
  }
  _search(e) {

    // if (e.keyCode === ENTER_KEY) {
    //   const inputValue = e.target.value.trim();
    //
    //   if (validValue(inputValue, regExp)) {
    //     setOutline(this.getInput(), 'none');
    //
    //     const element = window.setData.data.filter(el => el.title === inputValue);
    //     //this._afterCreate(element);
    //     //console.log(element);
    //
    //     this.createListItem(element);
    //
    //
    //
    //     //console.log(element[0].description);
    //     this.getInput().value = '';
    //   }else {
    //     setOutline(this.getInput(), '1px solid red');
    //     this.getInput().value = '';
    //
    //   }
    // }
  }




  _getTemplate() {
    return (`<header class="header">
                <div class="container">
                    <div class="header-wrapper">
                      <div class="logo">
                          API
                      </div>
                      <div class="favorites">
                        <button class="favorites-btn">
                          Favorites
                        </button>
                      </div>
                    </div>  
                </div>
            </header>
            `)
  }
}
