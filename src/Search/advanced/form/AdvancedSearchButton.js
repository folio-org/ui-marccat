import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

class AdvancedSearchButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
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
        <FormattedMessage id="ui-cataloging.search.searchButton" />
      </Button>
    );
  }
}

export default connect(AdvancedSearchButton, C.META.MODULE_NAME);
