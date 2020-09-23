import { HeaderComponent } from './components/header.component.js';
import { BODY_ELEMENT, MAIN_ELEMENT, insertPosition, renderElement } from '../utils.js';
import { ListComponent } from './components/list.component.js';
import { InputComponent } from './components/input.component.js';
import { LocalData } from '../services/data-services.js';
import { ArrowUpComponent } from './components/arrow-up.component.js';

export class appComponent {
  constructor() {
    window.localData = new LocalData();
    window.counterOfFavorites = 0;
  }

  init() {

    const headerComponent = new HeaderComponent(),
          headerElement = headerComponent.getElement();
    renderElement(BODY_ELEMENT, headerElement, insertPosition.BEFORE_BEGIN);
    headerComponent.addEventListeners();


    const inputComponent = new InputComponent(),
      inputElement = inputComponent.getElement();
    renderElement(MAIN_ELEMENT, inputElement, insertPosition.BEFORE_BEGIN);
    inputComponent.addEventListeners();

    const listComponent = new ListComponent(),
      listElement = listComponent.getElement();
    renderElement(MAIN_ELEMENT, listElement, insertPosition.BEFORE_END);
    listComponent.addEventListeners();

    const arrowUpComponent = new ArrowUpComponent(),
      arrowUpElement = arrowUpComponent.getElement();
    renderElement(BODY_ELEMENT, arrowUpElement, insertPosition.BEFORE_END);
    arrowUpComponent.addEventListeners();
  }
}
