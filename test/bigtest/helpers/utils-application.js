import ReactDOM from 'react-dom';
import { computed } from '@bigtest/interactor';

function getCleanTestingRoot() {
  let $root = document.getElementById('root');

  if ($root) {
    ReactDOM.unmountComponentAtNode($root);
    $root.parentNode.removeChild($root);
  }

  $root = document.createElement('div');
  $root.id = 'root';

  document.body.appendChild($root);

  return $root;
}

export function mount(component) {
  return new Promise(resolve => {
    ReactDOM.render(component, getCleanTestingRoot(), resolve);
  });
}

export function selectorFromClassnameString(str) {
  return str.replace(/\s/, '.');
}

export const hasClassBeginningWith = (selector, className) => {
  return computed(function () {
    return this.$(selector).className.includes(className);
  });
};

export const getComputedStyle = (selector, className) => {
  return computed(function () {
    const element = this.$(selector);
    return window.getComputedStyle(element)[className];
  });
};
