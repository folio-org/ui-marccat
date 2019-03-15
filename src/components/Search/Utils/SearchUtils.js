import { includes } from 'lodash';
import { languageFilterMap, formatFilterMap } from '../Filter/FilterMapper';
import { EMPTY_STRING } from '../../../shared/Constants';

export const getLanguageFilterQuery = (languageFilter) => {
  return languageFilter
    .map(e => {
      return 'LAN "' + languageFilterMap[Object.keys(e)[0]] + '"';
    }).join(' OR ');
};

export const getFormatFilterQuery = (formatFilter) => {
  return formatFilter
    .map(f => {
      return formatFilterMap[Object.keys(f)[0]];
    }).join(' OR ');
};

export const isAuthorityRecord = (meta) => {
  return meta.recordView === -1;
};

export const transitionToParams = (key, value) => {
  const url = window.location.pathname;
  return includes(url, `${key}=${value}`);
};

export const If = (k) => (k) || undefined;
export const safeString = str => (str) || EMPTY_STRING;
export const safeObject = (obj, prop) => ((obj) ? obj[prop] : EMPTY_STRING);
