import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import React from 'react';
import Navigator from '../Navigator';
import css from './Cataloging.css';

class Cataloging extends React.Component {
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
    }).isRequired
  };

  static manifest = Object.freeze({
    query: { initialValue: {} }
  });

  constructor(props) {
    super(props);
    this.store = props.stripes.store;
  }


  render() {
    return (
      <div className={css.cataloging}>
        <Navigator {...this.props} />
      </div>
    );
  }
}

export default Cataloging;
