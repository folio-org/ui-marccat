import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

class ScanButton extends React.Component {
  render() {
    return (
      <Button
        {...this.props}
        onClick={this.props.onClick}
        type="submit"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ 'minHeight': '36px' }}
      >
        <FormattedMessage id="ui-cataloging.search.scanButton" />
      </Button>
    );
  }
}

export default connect(ScanButton, C.META.MODULE_NAME);
