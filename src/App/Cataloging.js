import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import React from 'react';
import Navigator from '../Navigator';
import Root from '../Root';

class Cataloging extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
      connect: PropTypes.func
    }).isRequired,
    resources: PropTypes.shape({ // eslint-disable-line no-unused-vars
    }).isRequired,
    mutator: PropTypes.shape({ // eslint-disable-line no-unused-vars
      initializedFilterConfig: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      records: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
    }).isRequired
  };

  static manifest = Object.freeze({
    query: { initialValue: {} }
  });


  render() {
    return (
      <div>
        <Navigator {...this.props} />
      </div>
    );
  }
}

export default Cataloging;
