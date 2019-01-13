import { SPACED_STRING } from '../../../utils/Constant';

/**
 * @author: cchiama
 *
 * @param {text} string Text to camelize
 * @return string Camelized text
 */
export const camelizify = (str) => {
  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    return (p2) ? p2.toUpperCase() : p1.toLowerCase();
  });
};

/**
 * @author: cchiama
 *
 * @param {text} s Text to make first char uppercase
 * @param {*} string with first char uppercase
 */
const firstCharUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * @author: cchiama
 *
 * @param {text} string Text to camelize
 * @param {*} string Decamelized text
 */
export const decamelizify = (str, separator) => {
  // eslint-disable-next-line no-param-reassign
  separator = typeof separator === 'undefined' ? SPACED_STRING : separator;

  return firstCharUppercase(str)
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');
};
