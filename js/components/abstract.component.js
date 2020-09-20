import { createElement } from '../../utils.js';

export class AbstractComponent {

  constructor() {
    this._element = null;
  }

  _getTemplate() {
    throw new Error('You can not do this');
  }

  _afterCreate() {}

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
      this._afterCreate();
    }
    return this._element;
  }
}
