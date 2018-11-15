import React from 'react';
import FilterGroups, { initialFilterState } from '@folio/stripes-components/lib/FilterGroups';
import { ActionTypes } from '../../../redux/actions';
import { Props } from '../../../core';

import styles from './FiltersContainer.css';

type P = Props & {}
export default class FiltersContainer extends React.Component<P, {}> {
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
        values: ['All text', 'Books', 'Archival Manuscript/ Mixed Formats', 'Film or Video', 'Map', 'Map(Manuscript)', 'Music Recording', 'Music Score', 'Music Score (Manuscript)', 'Nonmusic recording', 'Periodical or Serials', 'Photograph, Print, or Drawing', 'Rare Book or Manuscript', 'Software or E-Resource', '3-D Object'],
      },
    ];

    this.state = {
      filters: initialFilterState(this.config, null),
    };
  }

  onChangeFilter = (e) => {
    const { name, checked } = e.target;
    const { dispatch } = this.props;
    this.setState(prevState => {
      const filters = Object.assign({}, prevState.filters);
      filters[name] = checked;
      dispatch({ type: ActionTypes.FILTERS, payload: filters, filterName: name, filterChecked: checked });
      return { filters };
    });
  }

  render() {
    return (
      <div className={styles['search-filters']}>
        <FilterGroups
          config={this.config}
          filters={this.state.filters}
          onChangeFilter={this.onChangeFilter}
        />
      </div>
    );
  }
}
