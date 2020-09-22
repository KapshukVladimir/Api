import { AbstractComponent } from './abstract.component.js';

export class ListItemComponent extends AbstractComponent {
  constructor({ image_url, name, description, target_fg}) {
    super();
    this._image_url = image_url;
    this._name = name;
    this._description = description;
    this._target_fg = target_fg;
  }

  _getTemplate() {
    return (`<li class="list-item">
                <div class="item-content">
                    <div class="img">
                        <img src="${this._image_url}" alt="image">
                    </div>
                    <div class="text">
                        <h3>${this._name}</h3>
                        <h4>${this._description}</h4>
                        <h3>Price: ${this._target_fg}&#8372;</h3>
                        <button class="add-favorite">Add to favorites</button>
                    </div>
                </div>
            </li>`);
  }
}
