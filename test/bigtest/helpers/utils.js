// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';

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
