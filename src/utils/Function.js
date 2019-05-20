/* eslint-disable no-new-func */
// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';
import { identity } from 'lodash';
import { FormattedMessage } from 'react-intl';
import queryString from 'querystring';
import { bindActionCreators } from 'redux';
import { META, ENDPOINT, EMPTY_SPACED_STRING, EMPTY_STRING, HTTP_METHOD } from '../config/constants';


//
// ─── CONST FUNCTION ─────────────────────────────────────────────────────────────
//

/**
 *
 * @param {text} s Text to make first char uppercase
 * @param {*} string with first char uppercase
 */
export const firstCharUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);


export const qs = {
  parse: path => queryString.parse(path, { ignoreQueryPrefix: true }),
  stringify: params => queryString.stringify(params, { encodeValuesOnly: true })
};

/**
 *
 *
 * @export
 * @param {string} url
 * @param {string} [params]
 * @param {boolean} [withslash=false]
 * @returns
 */
export function buildUrl(url: string, params?: string, withslash?: boolean = false) {
  return ENDPOINT.BASE_URL
    .concat((withslash) ? url.concat('/') : url)
    .concat('?')
    .concat(params);
}


/**
 *
 * @param {str} string Text to camelize
 * @return string Camelized text
 */
export function camelizify(str) {
  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    return (p2) ? p2.toUpperCase() : p1.toLowerCase();
  });
}

/**
 *
 *
 * @export
 * @param {string} str
 * @param {string} separator
 * @returns
 */
export function decamelizify(str: string, separator: string) {
  // eslint-disable-next-line no-param-reassign
  separator = typeof separator === 'undefined' ? EMPTY_SPACED_STRING : separator;

  return firstCharUppercase(str)
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');
}

/**
 *
 *
 * @export
 * @returns
 */
export function uuid() {
  return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable-next-line no-bitwise */
    const r = (Math.random() * 16) | 0;
    /* eslint-disable-next-line no-mixed-operators */
    const v = c === 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line no-bitwise
    return v.toString(16);
  });
}

/**
 *
 *
 * @export
 * @param {*} obj
 * @param {*} prop
 * @returns
 */
export function deduplicate(obj, prop) {
  return Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [`${prop}`]: cur }), {}));
}

/**
 *
 *
 * @export
 * @param {*} param
 * @returns
 */
export function findParam(param) {
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get(param);
}


/**
 *
 *
 * @export
 * @template K
 * @param {K} obj
 * @param {string} prop
 * @returns
 */
export function safeObj<K>(obj: K, prop: string) {
  return (obj && prop) ? obj[prop] : {};
}


/**
 *
 *
 * @export
 * @template T
 * @param {() => T} fn
 * @returns {() => T | identity<T>(value: T): T} a function passed as args or identity function @see
 */
export function safeFn<T>(fn: () => T): () => T {
  return (fn) ? fn() : identity;
}

/**
 *
 * @param  {Array<String> | String} label an array or a string of localized label
 * @return {React.JSX.Element} a localized message with value if passed
 */
export function Localize(label: Array<*> | string, withContainier?: boolean, _wrapElement?: React<HTMLElement>): React.JSX.Element {
  if (label.length) {
    return (!withContainier) ?
      label.map(l => <FormattedMessage id={META.MODULE_NAME.concat('.').concat(l.key)} values={{ value: l.value }} />) :
      label.map(l => <Button buttonStyle="dropdownItem" onClick={l.action}><FormattedMessage id={META.MODULE_NAME.concat('.').concat(l.key)} values={{ value: l.value }} /></Button>);
  }
  return <FormattedMessage id={META.MODULE_NAME.concat('.').concat(label.key)} values={{ value: label.value || EMPTY_STRING }} />;
}

/**
 *
 * @param {String} url the API endpoint
 * @param {K} data the body of request
 * @returns {Promise<K> | Promise<*>} a generic promise response from api call.
 */
export function post<K>(url: string, data: K): Promise<K> {
  return fetch(url, {
    method: HTTP_METHOD.POST,
    headers: Object.assign({}, {
      'X-Okapi-Tenant': 'tnx',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data),
  });
}

/**
 *
 * @export
 * @param {{}} params
 * @returns
 */
export function interpolate(params: {}) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
}

/**
 *
 *
 * @export
 * @template K
 * @param {K} [fisrt, ...rest]
 * @returns
 */
export function inject<K>([fisrt, ...rest]: K) {
  return (...values) => rest.reduce((acc, str, i) => acc + values[i] + str, fisrt);
}


//
// ─── REDUX UTILITY ──────────────────────────────────────────────────────────────
//

/**
 *
 *
 * @export
 * @param {() => void} dispatch
 * @param {[]} actions
 * @returns
 */
export function dispatcher(dispatch: () => void, actions: []) {
  return bindActionCreators({ ...actions }, dispatch);
}

/**
 * @see documentation https://redux.js.org/api/compose
 *
 * @param {array} fn  an array of functiuon to compose
 * @returns {any|(function(...[any]): any)} a function composed from fn param
 */
export const compose = (...fn) => fn.reduce((f, g) => (...args) => f(g(...args)));
