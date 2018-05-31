import PropTypes from 'prop-types';
import React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { ENDPOINT, RESOURCE_TYPE } from '../constant';
import css from './LogicalView.css';

class LogicalView extends React.Component {
    static manifest = Object.freeze({
      views: {
        type: RESOURCE_TYPE,
        root: ENDPOINT.BASE_URL,
        path: ENDPOINT.LOGICAL_VIEW_URL,
        headers: { 'x-okapi-tenant': 'tnx' },
        records: 'views',
        GET: {
          params: { lang: 'ita' },
        },
      },
    });

    render() {
      const { resources: { views } } = this.props; // eslint-disable-line react/prop-types
      if (!views || !views.hasLoaded) return <div />;
      const logicalViews = views.records;

      return (
        <div className={css.div}>
          <Select
            id="viewsSelect"
            dataOptions={logicalViews}
            value="0"
          />
        </div>
      );
    }
}

LogicalView.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default LogicalView;
