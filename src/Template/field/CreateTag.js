import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';
import css from '../styles/TemplateButton.css';

class CreateTag extends React.Component {
  render() {
    return (
      <div className={css.root}>
        <hr />
        <Button buttonStyle="primary" style={{ 'minHeight': '36px' }}>Create New Tag</Button>
      </div>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
