import { AbstractComponent } from './abstract.component.js';
import { BODY_ELEMENT } from '../../utils.js';

export class ArrowUpComponent extends AbstractComponent {

  _goUp() {
    BODY_ELEMENT.scrollIntoView({block: "start", behavior: 'smooth'});
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._goUp.bind(this));
  }

  _getTemplate() {
    return (`<button class="arrow">Go up</button>`)
  }
}
