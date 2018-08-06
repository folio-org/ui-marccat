/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import { Observable } from 'rxjs';
import css from '../../style/Search.css';
import * as C from '../../../Utils';

type Props = {
    onClick: Function;
    disabled: boolean;
    mutator: Object;
    history: Object;
    data: string;
};

type State = {
    results: Object;
};
class PreviousButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleScanPrevious = this.handleScanPrevious.bind(this);
  }

    handleScanPrevious = () => {
      this.props.mutator.previousPage.reset();
      this.props.mutator.query.replace(this.props.data);
      Observable.from(this.props.mutator.previousPage.GET());
    }
    render() {
      return (
        <div>
          <Button
            {...this.props}
            onClick={this.handleScanPrevious}
            type="button"
            disabled={this.props.disabled}
            buttonStyle="primary"
            buttonClass={css.previousButtonBrowsing}
          >
            <FormattedMessage id="ui-marccat.browsing.previous" />
          </Button>
        </div>
      );
    }
}

export default connect(PreviousButton, C.META.MODULE_NAME);

