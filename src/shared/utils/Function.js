/* eslint-disable no-redeclare */
/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
//
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import queryString from 'querystring';
import { bindActionCreators } from 'redux';
import { META, ENDPOINT, EMPTY_SPACED_STRING, EMPTY_STRING, HTTP_METHOD } from '../../config/constants';

/**
 *
 * @param {*} s
 * @param {*} sep
 */
export const replaceSeparator = (s, sep) => s.replace(sep, '$');

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} withslash
 */
export const buildUrl = (state, url, params, withslash = false) => {
  return ENDPOINT.OKAPI_URL(state)
    .concat((withslash) ? url.concat('/') : url)
    .concat('?')
    .concat(params);
};

/**
 *
 * @param {str} string Text to camelize
 * @return string Camelized text
 */
export const camelizify = (str) => {
  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    return (p2) ? p2.toUpperCase() : p1.toLowerCase();
  });
};

/**
 *
 * @param {text} s Text to make first char uppercase
 * @param {*} string with first char uppercase
 */
export const firstCharUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);

/**
 *
 * @param {text} string Text to camelize
 * @param {*} string Decamelized text
 */
export const decamelizify = (str, separator) => {
  // eslint-disable-next-line no-param-reassign
  separator = typeof separator === 'undefined' ? EMPTY_SPACED_STRING : separator;

  return firstCharUppercase(str)
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');
};

export const uuid = () => {
  return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 *
 * @param {*} obj
 * @param {*} prop
 */
export const deduplicate = (obj, prop) => {
  return Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [`${prop}`]: cur }), {}));
};

/**
 *
 * @param {*} param the param to retrieve
 * @returns the param or undefined
 */
export function findParam(param) {
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get(param);
}

export const qs = {
  parse: path => queryString.parse(path, { ignoreQueryPrefix: true }),
  stringify: params => queryString.stringify(params, { encodeValuesOnly: true })
};

/**
 *
 * @param {*} obj
 * @param {*} prop
 */
export function safeObj(obj, prop) {
  return (obj && prop) ? obj[prop] : {};
}

/**
 *
 * @param {Function} fn
 * @param {Function} prop
 */
export function safeFn(fn) {
  return (fn) ? fn() : () => {};
}

/**
 *
 * @param {Object} obj
 * @param {*} res
 * @param {Array<any>} prop
 */
export function safeArray(obj, res, ...prop) {
  return (obj && obj[prop]) ? obj[prop[0]][prop[1]] : res;
}

/**
 *
 * @param  {Array<String> | String} label an array or a string of localized label
 * @return {React.JSX.Element} a localized message with value if passed
 */
export function Localize(label, withContainier, _wrapElement) {
  if (label.length) {
    return (!withContainier) ?
      label.map(l => <FormattedMessage id={META.MODULE_NAME.concat('.').concat(l.key)} values={{ value: l.value }} />) :
      label.map(l => <Button buttonStyle="dropdownItem" onClick={l.action}><FormattedMessage id={META.MODULE_NAME.concat('.').concat(l.key)} values={{ value: l.value }} /></Button>);
  }
  return <FormattedMessage id={META.MODULE_NAME.concat('.').concat(label.key)} values={{ value: label.value || EMPTY_STRING }} />;
}

/**
 *
 * @param {*} url - the API endpoint
 * @param {*} data - the body of request
 * @param {*} store - the data store
 */
export function post(url, data) {
  const tenant = ENDPOINT.HEADERS;
  return fetch(url, {
    method: HTTP_METHOD.POST,
    headers: Object.assign({}, {
      tenant
    }),
    body: JSON.stringify(data),
  });
}

/**
 *
 * @param {*} dispatch
 * @param {*} actions
 */
export const dispatcher = (dispatch, actions) => bindActionCreators({ ...actions }, dispatch);
