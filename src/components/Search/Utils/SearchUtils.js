import { languageFilterMap, formatFilterMap } from '../Select/FilterMapper';

const getLanguageFilterQuery = (languageFilter) => {
  return languageFilter
    .map(element => {
      return 'LAN "' + languageFilterMap[Object.keys(element)[0]] + '"';
    })
    .join(' OR ');
};

const getFormatFilterQuery = (formatFilter) => {
  return formatFilter
    .map(element => {
      return formatFilterMap[Object.keys(element)[0]];
    })
    .join(' OR ');
};

const isAuthorityRecord = (meta) => {
  return meta.recordView === -1;
};

export {
  getLanguageFilterQuery,
  getFormatFilterQuery,
  isAuthorityRecord
};
