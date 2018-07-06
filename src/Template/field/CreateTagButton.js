import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

class CreateTagButton extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <Button buttonStyle="primary" style={{ 'minHeight': '36px' }}>Create New Tag</Button>
      </div>
    );
  }
}

export default connect(CreateTagButton, C.META.MODULE_NAME);
