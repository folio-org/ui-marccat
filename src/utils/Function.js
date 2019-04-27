/* eslint-disable no-redeclare */
/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'querystring';
import { META, ENDPOINT, EMPTY_SPACED_STRING, EMPTY_STRING } from '../shared/config/constants';

/**
 *
 * @param {*} s
 * @param {*} sep
 */
export const replaceSeparator = (s:string, sep:string) => s.replace(sep, '$');

/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} withslash
 */
export const buildUrl = (url:string, params?:string, withslash?: boolean = false) => {
  return ENDPOINT.BASE_URL
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
export const decamelizify = (str:string, separator:string) => {
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
  return (obj) ? obj[prop] : {};
}

/**
 *
 * @param {*} obj
 * @param {*} res
 * @param  {...any} prop
 */
export function safeArray(obj, res, ...prop) {
  return (obj && obj[prop]) ? obj[prop[0]][prop[1]] : res;
}

/**
 *
 * @param  {...any} labels
 */
export function Localize(label): React.JSX.Element {
  if (label.length) return label.map(l => <FormattedMessage id={META.MODULE_NAME.concat('.').concat(l.key)} values={{ value: l.value }} />);
  return <FormattedMessage id={META.MODULE_NAME.concat('.').concat(label.key)} values={{ value: label.value || EMPTY_STRING }} />;
}

// eslint-disable-next-line no-extend-native
Array.prototype.insert = (index, item) => {
  this.splice(index, 0, item);
};
