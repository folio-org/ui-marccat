/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../../Utils';

class NearButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <Button
        {...this.props}
        onClick={this.props.onClick}
        type="button"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ minHeight: '36px' }}
      >
        <FormattedMessage id="ui-marccat.search.nearButton" />
      </Button>
    );
  }
}

export default connect(NearButton, C.META.MODULE_NAME);

