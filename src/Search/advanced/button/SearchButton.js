/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { Observable } from 'rxjs';
import { FormattedMessage } from 'react-intl';
import { withCloseHandler } from '../../../Core/';
import * as C from '../../../Utils';

type Props = {
  mutator: Object;
  data: string;
  disabled: boolean;
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
    const observer = Observable.from(this.props.mutator.searchQuery.GET());
    observer
      .take(1)
      .takeUntil(r => this.state.results !== r)
      .map(r => this.setState({ results: r }))
      .subscribe();
  }

  render() {
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
        {/* {this.state.results &&
          <Modal dismissible closeOnBackgroundClick onClose={this.handleClose} open={isOpen} label={`Results for: ${this.props.data}`}>
            {this.state.results && this.state.results[0] ?
              <XLSTTrasform {...this.props} xmlData={this.state.results[0].data} />
              : <div>{'No Result Found for ' + this.props.data}</div>}
          </Modal>
        } */}
      </div>
    );
  }
}

export default withCloseHandler(connect(SearchButton, C.META.MODULE_NAME));
