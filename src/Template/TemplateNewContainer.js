import React from 'react';
import PropTypes from 'prop-types';
import TemplateNewMandatory from './TemplateNewMandatory';

class TemplateNewContainer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
    button: PropTypes.shape({
      onClick: PropTypes.func,
    })
  };

  constructor(props) {
    super(props);
    this.connectedTemplateNewContainer = props.stripes.connect(TemplateNewMandatory);
  }


  render() {
    return (
      <div>
        <this.connectedTemplateNewContainer {...this.props} />
      </div>
    );
  }
}

export default TemplateNewContainer;
