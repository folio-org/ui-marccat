import PropTypes from 'prop-types';
import React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import * as C from '../constant';/** utilizziamo C come namespace per tutte le costanti* */
import css from './LogicalView.css';
import { remapCodeLongDescription } from '../Utils/Mapper';

class LogicalView extends React.Component {
  static manifest = Object.freeze({
    views: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.LOGICAL_VIEW_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.LOGICAL_VIEW,
      GET: {
        params: { lang: 'ita' },
      },
    },
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
    const { resources: { views } } = this.props;
    if (!views || !views.hasLoaded) return emptySelect;
    const logicalViews = views.records;
    /** utilizzare l operatore ternario per visualizzare la select in base alla presenza di redords* */
    return (
      <div className={css.root}>
        <label htmlFor={C.LOGICAL_VIEW_SELECT.ID}>Database</label>
        <Select
          id={C.LOGICAL_VIEW_SELECT.ID}
          dataOptions={(!views.records) ? emptySelect : remapCodeLongDescription(logicalViews)}
          value={C.LOGICAL_VIEW_SELECT.INITIAL_VALUE}
          onChange={() => {}}
        />
      </div>
    );
  }
}

LogicalView.propTypes = {
  resources: PropTypes.object.isRequired
};

export default LogicalView;
