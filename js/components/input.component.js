import { AbstractComponent } from './abstract.component.js';
import { MAIN_ELEMENT, ENTER_KEY, insertPosition, regExp, isEmpty, renderElement, setOutline, validValue } from '../../utils.js';
import { RecentSearchesListComponent } from './recent-searches-list.component.js';
import { ListComponent } from './list.component.js';
import { LoadMoreComponent } from './load-more.component.js';



export class InputComponent extends AbstractComponent {

  createRecentSearches(el) {
    const recentSearchesListComponent = new RecentSearchesListComponent(el),
      recentSearchesListElement = recentSearchesListComponent.getElement();

    renderElement(this.getRecentList(), recentSearchesListElement, insertPosition.BEFORE_END);
    recentSearchesListComponent.addEventListeners();
  }
  _afterCreate() {

    if (localStorage.getItem('arrayOfRecent')) {
      window.arrayOfRecent = JSON.parse(localStorage.getItem('arrayOfRecent'));
    }else {
      window.arrayOfRecent = [];
    }
      this._render(window.arrayOfRecent)
  }

  _render(array) {

    if (isEmpty(array)) {
        array.forEach(el => {
          this.createRecentSearches(el)
        });
    }
  }

  refreshSettings(inputValue) {
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

  _fetchData(inputValue) {
    const theInput = this.getInput();
    if (validValue(inputValue, regExp)) {
      setOutline(theInput, 'none');
      window.arrayOfRecent = [...window.arrayOfRecent, inputValue];
      localStorage.setItem('arrayOfRecent', JSON.stringify(window.arrayOfRecent));

      this.refreshSettings(inputValue);

      window.localData.fetchUrl()
        .then(res => res.json())
        .then(dataArray => {
          dataArray.forEach(el => {
            el.btnState = true;
          });
          window.arrayFromUrl = dataArray;
        })
        .then(() => {
          this.createList();
          this.createLinkLoadMore();
          this._render(window.arrayOfRecent)
        });

      this.getRecentList().innerHTML = '';
      window.localData.update();
      theInput.value = '';
    }else {
      setOutline(theInput, '1px solid red');
      theInput.value = '';
    }
  }

  _click() {
    const inputValue =  this.getInput().value;

    this._fetchData(inputValue)
  }

  _onPressed(e) {

    if (e.keyCode === ENTER_KEY || e.type === 'click' ) {
      MAIN_ELEMENT.lastChild.previousSibling.innerHTML = "";
      const inputValue = e.target.value.trim().toLowerCase();

      this._fetchData(inputValue)
    }
  }

  createLinkLoadMore() {
    const loadMoreComponent = new LoadMoreComponent(),
      loadMoreElement = loadMoreComponent.getElement();

    renderElement(MAIN_ELEMENT.lastChild.previousSibling, loadMoreElement, insertPosition.BEFORE_END);
    loadMoreComponent.addEventListeners();
  }

  addEventListeners() {
    this.getInput().addEventListener('keypress', this._onPressed.bind(this));
    this.getSearchBtn().addEventListener('click', this._click.bind(this));
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

