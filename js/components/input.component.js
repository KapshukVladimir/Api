import { AbstractComponent } from './abstract.component.js';
import { ENTER_KEY, insertPosition, regExp, renderElement, setOutline, validValue } from '../../utils.js';
import { RecentSearchesListComponent } from './recent-searches-list.component.js';
import { LoadMoreComponent } from './load-more.component.js';

export class InputComponent extends AbstractComponent {
  constructor() {
    super();
    window.arrayOfRecent = [];
  }
  _render(array) {
    console.log(array);
    if (array.length !== 0) {
      const parsedArray = JSON.parse(array);
      if (parsedArray.length !== 0) {
        parsedArray.forEach(el => {
          const recentSearchesListComponent = new RecentSearchesListComponent(el),
            recentSearchesListElement = recentSearchesListComponent.getElement();
          renderElement(this.getRecentList(), recentSearchesListElement, insertPosition.BEFORE_END);
          recentSearchesListComponent.addEventListeners();
        });
      }
    }
  }
  _afterCreate() {

    window.arrayOfRecent = [];
    console.log(window.arrayOfRecent);
    // if (window.arrayOfRecent.length !== null) {
    //   this._render(window.arrayOfRecent);
    // }
  }

  getRecentList() {
    return this.getElement().querySelector('.recent-searches');
  }
  _update(inputValue){
    window.localData.emitEvent('update-input', inputValue)
  }
  static index = 0;
  _onPressed(e) {
    if (e.keyCode === ENTER_KEY) {

      const inputValue = e.target.value.trim().toLowerCase();

      if (validValue(inputValue, regExp)) {
        setOutline(this.getInput(), 'none');
        window.arrayOfRecent.push(inputValue);
        this._update(inputValue);


        this.getRecentList().innerHTML = '';

        localStorage.setItem(`array`, JSON.stringify(window.arrayOfRecent));
        const item = localStorage.getItem('array');
        this._render(item);
        this.getInput().value = '';
      }else {
        setOutline(this.getInput(), '1px solid red');
        this.getInput().value = '';
      }
    }

  }

  addEventListeners() {
    this.getInput().addEventListener('keypress', this._onPressed.bind(this));
    this.getSearchBtn().addEventListener('click', this._onPressed.bind(this));
  }

  getInput() {
    return document.querySelector('.input-search');
  }
  getList() {
    return document.querySelector('.list');
  }
  getSearchBtn() {
    return document.querySelector('.search-btn');
  }
  _getTemplate() {
    return (`<div class="header-input">
                  <div class="flex-wrapper">
                      <input type="text" autofocus class="input-search">
                      <button class="search-btn"><img src="https://www.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="search"></button>
                  </div>
                  <div class="recent-searches-wrapper">
                        <div>Recent searches (${InputComponent.index})</div>
                        <ul class="recent-searches"></ul>
                  </div>
            </div>`)
  }
}
