import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

class CreateTemplate extends React.Component {
  render() {
    return (
      <Button buttonStyle="primary" style={{ 'min-height': '36px' }}>Create Template</Button>
    );
  }
}

export default connect(CreateTemplate, C.META.MODULE_NAME);
