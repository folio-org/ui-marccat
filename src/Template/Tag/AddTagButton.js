import React from 'react';
import PropTypes from 'prop-types';
import Select from '@folio/stripes-components/lib/Select';
import { connect } from '@folio/stripes-connect';
import * as C from '../../constant';
import { remapCodeDescription } from '../../Utils/Mapper';
import css from './Tag.css';

class AddTagButton extends React.Component {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.CATEGORY_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.CATEGORIES,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    }
  });

  render() {
    const emptySelect =
      <div className={css.root}>
        <label htmlFor={C.LOGICAL_VIEW_SELECT.ID}>{C.LOGICAL_VIEW_SELECT.LABEL}</label>
        <Select
          id={C.LOGICAL_VIEW_SELECT.ID}
          dataOptions={[C.LOGICAL_VIEW_SELECT.EMPTY_VALUE]}
          value={C.LOGICAL_VIEW_SELECT.INITIAL_VALUE}
          onChange={() => {}}
        />
      </div>;
    const { resources: { records } } = this.props;
    if (!records || !records.hasLoaded) return emptySelect;
    const categories = records.records;
    return (
      <div className={css.root}>
        <label htmlFor={C.CATEGORY_SELECT.ID}>Categories</label>
        <Select
          id={C.CATEGORY_SELECT.ID}
          dataOptions={(!records.records) ? emptySelect : remapCodeDescription(categories)}
          value={C.CATEGORY_SELECT.INITIAL_VALUE}
          onChange={() => {}}
        />
      </div>
    );
  }
}

AddTagButton.propTypes = {
  resources: PropTypes.object.isRequired
};

export default connect(AddTagButton, 'template-add-tag');
