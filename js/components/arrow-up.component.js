import { AbstractComponent } from './abstract.component.js';
import { BODY_ELEMENT } from '../../utils.js';

export class ArrowUpComponent extends AbstractComponent {

  _showBtn() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      this.getElement().style.display = "block";
    }else {
      this.getElement().style.display = 'none';
    }
  }

  _goUp() {
    BODY_ELEMENT.scrollIntoView({block: "start", behavior: 'smooth'});
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._goUp.bind(this));
    window.addEventListener('scroll', this._showBtn.bind(this));
  }

  _getTemplate() {
    return (`<button class="arrow">Go up</button>`)
  }
}
