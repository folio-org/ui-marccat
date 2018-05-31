import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import React from 'react';
import Navigator from '../Navigator';

/* import {
  ENDPOINT,
  RESOURCE_TYPE,
  INITIAL_RESULT_COUNT,
} from '../constant'; */


class Cataloging extends React.Component {
  // static propTypes = {
  //   stripes: PropTypes.shape({
  //     intl: PropTypes.object.isRequired,
  //   }).isRequired,
  //   resources: PropTypes.shape({ // eslint-disable-line no-unused-vars
  //   }).isRequired,
  //   mutator: PropTypes.shape({ // eslint-disable-line no-unused-vars
  //     initializedFilterConfig: PropTypes.shape({
  //       replace: PropTypes.func.isRequired,
  //     }),
  //     records: PropTypes.shape({
  //       POST: PropTypes.func.isRequired,
  //     }),
  //   }).isRequired,
  //   onSelectRow: PropTypes.func, // eslint-disable-line no-unused-vars
  //   onComponentWillUnmount: PropTypes.func, // eslint-disable-line no-unused-vars
  //   visibleColumns: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line no-unused-vars
  //   disableRecordCreation: PropTypes.bool, // eslint-disable-line no-unused-vars
  //   browseOnly: PropTypes.bool, // eslint-disable-line no-unused-vars
  // };

  /* static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: RESOURCE_TYPE,
      root: ENDPOINT.BASE_URL,
      path: ENDPOINT.TEMPLATE_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: 'recordTemplates',
      GET: {
        params: { lang: 'ita', type: 'B' },
      },
    }
  }); */


  render() {
    return (
      <div>
        <Navigator {...this.props} />
      </div>
    );
  }
}

export default Cataloging;
