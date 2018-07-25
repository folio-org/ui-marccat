/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

type Props = {
  onClick: Function;
  disabled: boolean;
};

type State = {};
class SearchButton extends React.Component<Props, State> {
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
        <FormattedMessage id="ui-marccat.search.searchButton" />
      </Button>
    );
  }
}

export default connect(SearchButton, C.META.MODULE_NAME);

