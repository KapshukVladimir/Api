import { AbstractComponent } from './abstract.component.js';

export class ErrorComponent extends AbstractComponent {

  _getTemplate() {
    return (`<li class="error">There were no properties found for the given location.</li>`)
  }
}
