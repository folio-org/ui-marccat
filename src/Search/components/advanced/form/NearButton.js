/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../../Utils';

type Props = {
  onClick: Function;
  disabled: boolean;
};

type State = {}
class NearButton extends React.Component<Props, State> {
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

