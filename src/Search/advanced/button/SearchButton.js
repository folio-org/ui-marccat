/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import _ from 'lodash';
import { Observable } from 'rxjs';
import Modal from '@folio/stripes-components/lib/Modal';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

type Props = {
  disabled: boolean;
  mutator: Object;
  data: string;
};

type State = {
  results: Object;
  isOpen: bool;
};
class SearchButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      isOpen: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSearch = () => {
    this.props.mutator.query.replace(this.props.data);
    const observer = Observable.from(this.props.mutator.searchQuery.GET());
    observer
      .take(1)
      .filter(r => r.length > 0)
      .map((r) => this.setState({ results: r, isOpen: true }))
      .subscribe();
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleSearch}
          type="button"
          disabled={this.props.disabled}
          buttonStyle="primary"
          style={{ width: '100%' }}
        >
          <FormattedMessage id="ui-marccat.search.searchButton" />
        </Button>
        {!_.isEmpty(this.state.results) &&
        <Modal dismissible closeOnBackgroundClick={this.handleClose} onClose={this.handleClose} open={this.state.isOpen} label={`Results for: ${this.props.data}`}>
          <div>{this.state.results ? this.state.results[0].data : 'No Result Found for ' + this.props.data}</div>
        </Modal>
        }
      </div>
    );
  }
}

export default connect(SearchButton, C.META.MODULE_NAME);

