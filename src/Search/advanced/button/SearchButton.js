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
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (data) => {
    this.props.mutator.query.replace(this.props.data);
  }

  render() {
    return (
      <Button
        onClick={this.handleSearch}
        type="button"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ width: '100%' }}
      >
        <FormattedMessage id="ui-marccat.search.searchButton" />
      </Button>
    );
  }
}

export default connect(SearchButton, C.META.MODULE_NAME);

