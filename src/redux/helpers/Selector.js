// @flow strict
import { destroy, clearFields } from 'redux-form';
import { safeObj } from '../../shared';

/**
 *
 * @param {*} store
 * @returns
 */
export const getReducer = (store: {}) => {
  return store.getState().marccat || {};
};

/**
 *
 * @param {Object} store redux store
 * @param {String} formName name of the form
 * @returns - values of redux form
 */
export const selectForm = (store: {}, formName: string) => {
  return (store.getState().form) ? store.getState().form[formName] : undefined;
};
/**
 *
 * @param {Object} store redux store
 * @param {String} formName name of the form
 * @returns - values of redux form
 */
export const valuesOf = (store: {}, formName: string) => {
  return (selectForm(store, formName)) ? selectForm(store, formName).values : undefined;
};

/**
 *
 * @param {Object} store redux store
 * @param {String} formName name of the form
 * @param {Object} field field to retrieve value
 * @returns  values of form field passed as last args
 */
export const formFieldValue = (store: {}, formName: string, field: {}) => {
  return (valuesOf(store, formName)) ? valuesOf(store, formName)[field] : undefined;
};

/**
 *
 * @param {*} form
 * @param  {...any} fields
 */
export const cleanForm = (form, ...fields) => {
  clearFields(form, true, true, ...fields);
};
/**
 *
 * @param {*} store
 * @param {*} formName
 * @returns - values of redux form
 */
export const resetAll = (props, ...forms) => {
  forms.map(f => props.dispatch(props.reset(f.name)));
};
/**
 *
 * @param {*} store
 * @param {*} formName
 * @returns - values of redux form
 */
export const destroyAll = (...forms) => {
  forms.map(f => destroy((f.name)));
};
/**
 *
 * @param {*} store
 * @param {*} reducer
 * @param {*} prop
 * @returns
 */
export const selectorData = (store) => {
  return store.getState().marccat.data;
};

export const selectKey = (key) => {
  return selectorData()[key];
};

export const safeSelectKey = (reducer, key) => {
  return safeObj(reducer, reducer[key]);
};

/**
 *
 * @param {*} store
 * @param {*} reducer
 * @param {*} prop
 * @returns
 */
export const selectorBy = (key, prop) => {
  return selectKey(key)[prop];
};

/**
 *
 * @param {*} data
 * @param {*} model
 * @param {*} jsonApiKey
 * @returns
 */
export const resolve = (data, key) => {
  return (data && data[key] && data[key].results) ? data[key].results : {};
};


/**
 *
 * @param {*} store
 * @param {*} reducer
 * @param {*} prop
 * @returns
 */
export const get = (store, reducer, prop) => {
  return store.getState().marccat[reducer][prop];
};
