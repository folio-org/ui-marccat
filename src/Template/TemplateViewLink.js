import React from 'react';
import PropTypes from 'prop-types';
import { TemplateView } from './';


class TemplateViewLink extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
  };


  constructor(props) {
    super(props);
    this.connectedTemplateView = props.stripes.connect(TemplateView);
  }

  render() {
    return (
      <this.connectedTemplateView {...this.props} />
    );
  }
}

export default TemplateViewLink;
