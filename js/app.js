import { HeaderComponent } from './components/header.component.js';
import { BODY_ELEMENT, MAIN_ELEMENT, insertPosition, renderElement } from '../utils.js';
import { ListComponent } from './components/list.component.js';
import { InputComponent } from './components/input.component.js';
import { LocalData } from '../services/data-services.js';

export class appComponent {
  constructor() {
    window.localData = new LocalData();
  }
  init() {

    const headerComponent = new HeaderComponent(),
          headerElement = headerComponent.getElement();
    renderElement(BODY_ELEMENT, headerElement, insertPosition.BEFORE_BEGIN);


    const inputComponent = new InputComponent(),
      inputElement = inputComponent.getElement();
    renderElement(MAIN_ELEMENT, inputElement, insertPosition.BEFORE_BEGIN);
    inputComponent.addEventListeners();

    const listComponent = new ListComponent(),
      listElement = listComponent.getElement();
    renderElement(MAIN_ELEMENT, listElement, insertPosition.BEFORE_END);
    listComponent.addEventListeners();
  }
}
