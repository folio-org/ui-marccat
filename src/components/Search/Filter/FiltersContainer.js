// @flow
import * as React from 'react';
import FilterGroups, { initialFilterState } from '@folio/stripes-components/lib/FilterGroups';
import { ACTION } from '../../../redux/actions';
import { EMPTY_STRING } from '../../../config/constants';
import type { Props } from '../../../flow/types.js.flow';

import styles from './FiltersContainer.css';
import { filterAction } from '../../../redux/actions/ActionCreator';

export default class FiltersContainer extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.config = [
      {
        label: 'Record Type',
        name: 'recordType',
        cql: 'record.name',
        values: ['Bibliographic records', 'Authority records'],
      },
      {
        label: 'Suppressed',
        name: 'suppressedFilter',
        cql: 'suppressed.name',
        values: ['Yes', 'No'],
      },
      {
        label: 'Language of text',
        name: 'languageFilter',
        cql: 'language.name',
        values: ['English', 'Italian', 'Spanish', 'French', 'Hungarian', 'Chinese, simplified', 'Arabic'],
      },
      {
        label: 'Format type',
        name: 'formatType',
        cql: 'format.name',
        values: ['All text', 'Books', 'Archival Manuscript/ Mixed Formats', 'Film or Video', 'Map', 'Map(Manuscript)', 'Music Recording', 'Music Score', 'Music Score (Manuscript)', 'Nonmusic recording', 'Periodical or Serials', 'Photograph, Print, or Drawing', 'Rare Book or Manuscript', 'Software or E-Resource', '3-D Object', 'Microform'],
      },
    ];

    this.state = {
      filters: initialFilterState(this.config, null),
      containsAuthFilter: false,
    };
  }

  onChangeFilter = (e) => {
    const { name, checked } = e.target;
    const { dispatch } = this.props;
    this.setState(prevState => {
      const filters = Object.assign({}, prevState.filters);
      filters[name] = checked;
      dispatch({ type: ACTION.FILTERS, payload: filters, filterName: name, isChecked: checked });
      return { filters };
    });
  }

  onClearFilter = () => {
    const { dispatch } = this.props;
    this.setState(() => {
      const filters = {};
      return { filters };
    });
    dispatch(filterAction({}, EMPTY_STRING, false));
  }

  render() {
    const { filters } = this.state;
    const filterArray = [];
    Object.keys(filters).forEach((key) => filterArray.push(key + ':' + filters[key]));
    const { filterEnable } = this.props;
    const disableFilters = {};
    let { containsAuthFilter } = this.state;
    if (filterArray.includes('recordType.Authority records:true')) {
      containsAuthFilter = true;
      disableFilters.recordType = false;
      disableFilters.suppressedFilter = true;
      disableFilters.languageFilter = true;
      disableFilters.formatType = true;
    } else {
      containsAuthFilter = false;
      disableFilters.recordType = true;
      disableFilters.suppressedFilter = true;
      disableFilters.languageFilter = true;
      disableFilters.formatType = true;
    }
    return (
      <div className={(filterEnable) ? styles['search-filters'] : styles['search-filters-disabled']}>
        <FilterGroups
          disableNames={(!filterEnable || containsAuthFilter) ? disableFilters : {}}
          config={this.config}
          filters={filters}
          onChangeFilter={this.onChangeFilter}
          onClearFilter={this.onClearFilter}
        />
      </div>
    );
  }
}
