import { AbstractComponent } from './abstract.component.js';

export class LoadMoreComponent extends AbstractComponent {
  _getTemplate() {
    return (`<a class="load-more">Load More</a>`)
  }
}
