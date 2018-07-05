import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

class AndButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  render() {
    const { disabled, onClick } = this.props;
    return (
      <Button
        {...this.props}
        onClick={onClick}
        type="submit"
        disabled={disabled}
        buttonStyle="primary"
        style={{ 'minHeight': '36px' }}
      >
        <FormattedMessage id="ui-cataloging.search.andButton" />
      </Button>
    );
  }
}

export default connect(AndButton, C.META.MODULE_NAME);
