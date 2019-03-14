/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
import { ENDPOINT, EMPTY_SPACED_STRING } from './Constants';

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
 * @param {*} vector
 * @param {*} k
 */
export const first = (vector, k):void => {
  if (vector === null) { return; }
  if (k == null) { return vector[0]; }
  if (k < 0) { return []; }
  return vector.slice(0, k);
};

/**
 *
 * @param {*} obj
 * @param {*} prop
 */
export const deduplicate = (obj, prop) => {
  return Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [`${prop}`]: cur }), {}));
};
