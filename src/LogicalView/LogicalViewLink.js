import React from 'react';
import PropTypes from 'prop-types';
import { LogicalView } from './';

class LogicalViewLink extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedLogicalView = props.stripes.connect(LogicalView);
  }

  render() {
    return (
      <this.connectedLogicalView {...this.props} />
    );
  }
}

export default LogicalViewLink;
