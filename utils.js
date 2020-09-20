
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
