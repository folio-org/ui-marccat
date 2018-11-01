import { languageFilterMap, formatFilterMap } from '../Select/FilterMapper';

const getLanguageFilterQuery = (languageFilter) => {
  return languageFilter
    .map(e => {
      return 'LAN "' + languageFilterMap[Object.keys(e)[0]] + '"';
    }).join(' OR ');
};

const getFormatFilterQuery = (formatFilter) => {
  return formatFilter
    .map(e => {
      return formatFilterMap[Object.keys(e)[0]];
    }).join(' OR ');
};

const isAuthorityRecord = (meta) => {
  return meta.recordView === -1;
};

export {
  getLanguageFilterQuery,
  getFormatFilterQuery,
  isAuthorityRecord
};
