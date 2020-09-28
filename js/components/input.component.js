import { AbstractComponent } from './abstract.component.js';
import { ENTER_KEY, insertPosition, regExp, renderElement, setOutline, validValue } from '../../utils.js';
import { RecentSearchesListComponent } from './recent-searches-list.component.js';
import { ListComponent } from './list.component.js';
import { MAIN_ELEMENT } from '../../utils.js';
import { LoadMoreComponent } from './load-more.component.js';


export class InputComponent extends AbstractComponent {
  constructor() {
    super();
    window.arrayOfRecent = [];
  }

  createRecentSearches(el) {
    const recentSearchesListComponent = new RecentSearchesListComponent(el),
      recentSearchesListElement = recentSearchesListComponent.getElement();
    renderElement(this.getRecentList(), recentSearchesListElement, insertPosition.BEFORE_END);
    recentSearchesListComponent.addEventListeners();
  }

  _render(array) {

    if (array.length !== 0) {
      const parsedArray = JSON.parse(array);

      if (parsedArray.length !== 0) {
        parsedArray.forEach(el => {
          this.createRecentSearches(el)
        });
      }
    }
  }
  refreshSettings(inputValue) {
    window.localData.requestSettings.per_page = 2;
    window.localData.requestSettings.beer_name = inputValue;
  }
  getRecentList() {
    return this.getElement().querySelector('.recent-searches');
  }

  createList() {
    const listComponent = new ListComponent(window.arrayFromUrl),
      listElement = listComponent.getElement();
    renderElement(MAIN_ELEMENT.lastChild.previousSibling, listElement, insertPosition.BEFORE_END);
    listComponent.addEventListeners();
  }
  _onPressed(e) {
    if (e.keyCode === ENTER_KEY) {
      MAIN_ELEMENT.lastChild.previousSibling.innerHTML = "";
      const inputValue = e.target.value.trim().toLowerCase();

      if (validValue(inputValue, regExp)) {
        setOutline(this.getInput(), 'none');
        window.arrayOfRecent.push(inputValue);

        this.refreshSettings(inputValue);

        window.state = 'add';
        window.localData.fetchUrl()
          .then(res => res.json())
          .then(dataArray => {
            dataArray.forEach(el => {
              el.btnState = true;
            });
            window.arrayFromUrl = dataArray;
          })
          .then(() => this.createList())
          .then(() => this.createLinkLoadMore());

        this.getRecentList().innerHTML = '';
        window.localData.update();
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
  createLinkLoadMore() {
    const loadMoreComponent = new LoadMoreComponent(window.arrayFromUrl);
    const loadMoreElement = loadMoreComponent.getElement();
    renderElement(MAIN_ELEMENT.lastChild.previousSibling, loadMoreElement, insertPosition.BEFORE_END);
    loadMoreComponent.addEventListeners();
  }

  addEventListeners() {
    this.getInput().addEventListener('keypress', this._onPressed.bind(this));
    this.getSearchBtn().addEventListener('click', this._onPressed.bind(this));
  }

  getInput() {
    return document.querySelector('.input-search');
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
                        <div>Recent searches</div>
                        <ul class="recent-searches"></ul>
                  </div>
            </div>`)
  }
}

