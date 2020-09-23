import { AbstractComponent } from './abstract.component.js';
import { FavoriteComponent } from './favorite.component.js';
import { insertPosition, renderElement } from '../../utils.js';

export class HeaderComponent extends AbstractComponent {
  constructor() {
    super();
  }

  _afterCreate() {
    this._render();
  }

  getFavoritesWrapper() {
    return this.getElement().querySelector('.favorites-wrapper');
  }
  createFavoriteBtn() {
    const favoriteComponent = new FavoriteComponent(),
      favoriteElement = favoriteComponent.getElement();
    renderElement(this.getFavoritesWrapper(), favoriteElement, insertPosition.BEFORE_END);
    favoriteComponent.addEventListeners();
  }
  addEventListeners() {
    window.addEventListener('update-counter', this._render.bind(this));
  }
  _render() {
    this.getFavoritesWrapper().innerHTML = "";
    this.createFavoriteBtn();
  }
  _getTemplate() {
    return (`<header class="header">
                <div class="container">
                    <div class="header-wrapper">
                      <div class="logo">
                          API
                      </div>
                      <div class="favorites-wrapper">
                      </div>
                    </div>  
                </div>
            </header>
            `)
  }
}
