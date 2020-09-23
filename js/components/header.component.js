import { AbstractComponent } from './abstract.component.js';

export class HeaderComponent extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return (`<header class="header">
                <div class="container">
                    <div class="header-wrapper">
                      <div class="logo">
                          API
                      </div>
                      <div class="favorites">
                        <button class="favorites-btn">
                          Favorites
                        </button>
                      </div>
                    </div>  
                </div>
            </header>
            `)
  }
}
