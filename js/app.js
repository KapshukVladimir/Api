import { HeaderComponent } from './components/header.component.js';
import { BODY_ELEMENT, insertPosition, renderElement } from '../utils.js';

export class appComponent {
  init() {

    const headerComponent = new HeaderComponent(),
          headerElement = headerComponent.getElement();
    renderElement(BODY_ELEMENT, headerElement, insertPosition.BEFORE_BEGIN);
  }
}
