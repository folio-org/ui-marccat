import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TemplateName } from './';

class TemplateNameLink extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedTemplateName = props.stripes.connect(TemplateName);
  }

  render() {
    return (
      <Link to={`/Templates/view/${this.props.id}`}>
        <this.connectedTemplateName {...this.props} />
      </Link>
    );
  }
}

export default TemplateNameLink;
