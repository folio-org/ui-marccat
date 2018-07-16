import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

class CreateTemplateButton extends React.Component {
  render() {
    return (
      <Button
        {...this.props}
        onClick={this.props.onClick}
        type="submit"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ minHeight: '36px' }}
      >
        Create Template
      </Button>
    );
  }
}

export default connect(
  CreateTemplateButton,
  C.META.MODULE_NAME,
);
