import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { PropTypes } from 'prop-types';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

class CreateTemplateButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }
  render() {
    return (
      <Button
        {...this.props}
        onClick={this.props.onClick}
        type="submit"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ 'minHeight': '36px' }}
      >Create Template
      </Button>
    );
  }
}

export default connect(CreateTemplateButton, C.META.MODULE_NAME);
