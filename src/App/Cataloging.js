import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import React from 'react';
import NavDrawer from '../Navigator/components/NavDrawer';
import ProgressMobileStepper from './Preloader';

export default class Cataloging extends React.Component<PropTypes> {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
      locale: PropTypes.string.isRequired,
      connect: PropTypes.func,
      store: PropTypes.object,
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
    }).isRequired,
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
  });

  render() {
    return (
      <NavDrawer {...this.props} />
    );
  }
}
