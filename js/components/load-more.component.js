import { AbstractComponent } from './abstract.component.js';

export class LoadMoreComponent extends AbstractComponent {
  constructor() {
    super();
  }
  _loadMore(e){
    e.preventDefault();

    alert(2);
  }

  addEventListeners() {
    this.getElement().addEventListener('click', this._loadMore.bind(this));
  }
  _getTemplate() {
    return (`<a class="load-more">Load More</a>`)
  }
}
