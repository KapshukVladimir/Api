import { AbstractComponent } from './abstract.component.js';

export class RecentSearchesListComponent extends AbstractComponent {
  constructor(value) {
    super();
    this._value = value;
  }

  getInput() {
    return document.querySelector('.input-search');
  }

  _recent() {
    this.getInput().value = this._value;
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._recent.bind(this));
  }

  _getTemplate() {
    return (`<li class="recent-searches-item">${this._value}</li>`)
  }
}
