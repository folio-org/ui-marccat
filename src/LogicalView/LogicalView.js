import PropTypes from 'prop-types';
import React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils/';
import css from './LogicalView.css';
import { remapCodeLongDescription } from '../Utils/Mapper';
import CatalogingLoader from '../Loader';

class LogicalView extends React.Component {

  render() {
    const emptySelect =
      <div className={css.root}>
        <label htmlFor={C.LOGICAL_VIEW_SELECT.ID}>{C.LOGICAL_VIEW_SELECT.LABEL}</label>
        <CatalogingLoader />
        <Select
          id={C.LOGICAL_VIEW_SELECT.ID}
          dataOptions={[C.LOGICAL_VIEW_SELECT.EMPTY_VALUE]}
          value={C.LOGICAL_VIEW_SELECT.INITIAL_VALUE}
          onChange={() => {}}
        />
      </div>;
    // const { resources: { views } } = this.props;
    // if (!views || !views.hasLoaded) return emptySelect;
    const logicalViews = this.props.datas.views;
    /** utilizzare l operatore ternario per visualizzare la select in base alla presenza di redords* */
    return (
      <div className={css.root}>
        <label htmlFor={C.LOGICAL_VIEW_SELECT.ID}>Database</label>
        <Select
          id={C.LOGICAL_VIEW_SELECT.ID}
          dataOptions={remapCodeLongDescription(logicalViews)}
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

export default connect(LogicalView, C.META.MODULE_NAME);
