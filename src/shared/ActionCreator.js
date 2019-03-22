/* eslint-disable import/prefer-default-export */
import { ACTION } from './Action';
import { ENDPOINT, EMPTY_STRING } from './Constants';

/**
 *
 * @param {*} payload
 */
export const headingAction = (payload) => {
  return {
    type: ACTION.CREATE,
    data: {
      path: ENDPOINT.CREATE_HEADING_URL,
      type: `${payload.id}-${payload.tag}-`,
      params: ENDPOINT.DEFAULT_LANG_VIEW,
    },
    payload
  };
};

/**
 *
 * @param {*} payload
 */
export const filterAction = (payload:Object, filterName:string, isChecked:boolean) => {
  return {
    type: ACTION.FILTERS,
    payload,
    filterName,
    isChecked
  };
};
/**
 *
 * @param {*} payload
 */
export const resetFilter = () => {
  return {
    type: ACTION.FILTERS,
    payload: {},
    filterName: EMPTY_STRING,
    isChecked: false
  };
};
