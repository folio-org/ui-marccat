/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { Observable } from 'rxjs';
import Modal from '@folio/stripes-components/lib/Modal';
import { FormattedMessage } from 'react-intl';
import { withCloseHandler } from '../../../Core/';
import * as C from '../../../Utils';

type Props = {
  disabled: boolean;
  mutator: Object;
  data: string;
};

type State = {
  results: Object;
};
class SearchButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = () => {
    this.props.mutator.query.replace(this.props.data);
    // this.props.history.push('advancedSearch')
    const observer = Observable.from(this.props.mutator.searchQuery.GET());
    observer
      .take(1)
      .map(r => this.setState({ results: r, isOpen: true }))
      .subscribe();
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button
          fullWidth
          onClick={this.handleSearch}
          type="button"
          disabled={this.props.disabled}
          buttonStyle="primary"
        >
          <FormattedMessage id="ui-marccat.search.searchButton" />
        </Button>
        {this.state.results &&
          <Modal dismissible closeOnBackgroundClick onClose={this.handleClose} open={isOpen} label={`Results for: ${this.props.data}`}>
            <div>{this.state.results && this.state.results[0] ? this.state.results[0].data : 'No Result Found for ' + this.props.data}</div>
          </Modal>
        }
      </div>
    );
  }
}

export default withCloseHandler(connect(SearchButton, C.META.MODULE_NAME));
