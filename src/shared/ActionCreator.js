/* eslint-disable import/prefer-default-export */
import { ACTION } from './Action';
import { EMPTY_STRING } from './Constants';

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

/**
 *
 * @param {*} payload
 */
export const addHistoryData = (data) => {
  return {
    type: ACTION.HISTORY,
    data,
  };
};
