import { includes } from 'lodash';
import { languageFilterMap, formatFilterMap } from '../components/Search/Filter/FilterMapper';

const getLanguageFilterQuery = (languageFilter) => {
  return languageFilter
    .map(e => {
      return 'LAN "' + languageFilterMap[Object.keys(e)[0]] + '"';
    }).join(' OR ');
};

const getFormatFilterQuery = (formatFilter) => {
  return formatFilter
    .map(f => {
      return formatFilterMap[Object.keys(f)[0]];
    }).join(' OR ');
};

const isAuthorityRecord = (meta) => {
  return meta.recordView === -1;
};

const transitionToParams = (key, value, props) => {
  const url = props.location.pathname;
  return includes(url, `${key}=${value}`);
};

// const transitionToParamsWithQuery = (mode) => {
//   const url = this.props.location.pathname + this.props.location.search;
//   return includes(url, '?') ? `${url}&layer=${mode}` : `${url}?layer=${mode}`;
// };

export {
  getLanguageFilterQuery,
  getFormatFilterQuery,
  transitionToParams,
  isAuthorityRecord
};
