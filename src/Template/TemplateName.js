import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';

class TemplateName extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired, // eslint-disable-line
    resources: PropTypes.shape({
      template: PropTypes.object,
    }).isRequired,
  };

  static manifest = Object.freeze({
    template: {
      type: 'rest',
      path: 'template/!{id}',
    },
  });

  render() {
    const { template } = this.props.resources;
    if (!template || !template.hasLoaded || template.records.length !== 1) return null;

    const { templateName } = template.records[0].personal;

    return <span>{templateName}</span>;
  }
}

export default connect(TemplateName, 'ui-cataloging');
