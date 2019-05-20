// flow
import { map, identity } from 'lodash';

/**
 *
 * @param {array} params
 * @param {boolean} encode
 * @return {string} [encode]
 */
const generateQueryParams = (params, encode) => {
  const encodeCallback = encode ? encodeURIComponent : identity;
  const queryParamsString = map(params, (value, key) => [key, value].map(encodeCallback).join('=')).join('&');

  return `${(queryParamsString.length ? '?' : '')}${queryParamsString}`;
};
/**
 * Creates url with query parameters
 *
 * @param {string} url
 * @param {object} [queryParams]
 * @param {boolean} [encode] - disables encoding (required when using with manifest)
 */
export const createUrl = (url, queryParams = {}, encode = true) => {
  const paramsString = generateQueryParams(queryParams, encode);

  return `${url.endsWith('?') ? url.slice(0, -1) : url}${paramsString}`;
};

/**
 *
 * @param {*} response
 * @returns
 */
export const parseResponseBody = (response: {}) => { // metodo statico
  return response.text().then((text) => {
    try { return JSON.parse(text); } catch (e) { return text; }
  });
};

/**
 *
 * @param {*} method - Http method for fetch
 * @returns
 */
export const getHeaders = () => {
  const headers = {
    'Accept': 'application/json',
    'x-okapi-tenant': 'tnx',
    'Content-Type': 'application/json'
  };
  return headers;
};

/**
 * Helper for formatting errors returned from a rejected response
 * @param {Mixed} errors - the error or errors
 * @returns {Array} array of error objects
 */
export const formatErrors = (errors) => {
  const format = (err) => {
    if (typeof err === 'string') {
      return { title: err };
    } else if (err && err.message) {
      return { title: err.message };
    } else if (err && err.title) {
      return err;
    } else {
      return { title: 'An unknown error occurred' };
    }
  };

  if (Array.isArray(errors)) {
    return errors.map(format);
  } else {
    return [format(errors)];
  }
};
