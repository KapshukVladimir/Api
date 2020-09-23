
export const BODY_ELEMENT = document.querySelector('body');

export const insertPosition = {
  BEFORE_BEGIN: 'beforebegin',
  BEFORE_END: 'beforeend'
};

export function renderElement(container, element, position) {
  switch (position) {
    case insertPosition.BEFORE_BEGIN: container.prepend(element);
      break;
    case insertPosition.BEFORE_END: container.append(element);
      break;
    default: container.prepend(element);
  }
}

export function createElement(template) {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
}

export function validValue(value, regExp) {
  return regExp.test(value);
}

export const regExp = /[a-zа-я0-1]+$/i,
  ENTER_KEY = 13,
  MAIN_ELEMENT = document.querySelector('.main');

export function setOutline(element, value) {
  element.style.outline = value;
}
