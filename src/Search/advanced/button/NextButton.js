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
class NextButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleScanNext = this.handleScanNext.bind(this);
  }

    handleScanNext = () => {
      this.props.mutator.nextPage.reset();
      this.props.mutator.query.replace(this.props.data);
      Observable.from(this.props.mutator.nextPage.GET());
    }
    render() {
      return (
        <div>
          <Button
            {...this.props}
            onClick={this.handleScanNext}
            type="button"
            disabled={this.props.disabled}
            buttonStyle="primary"
            buttonClass={css.nextButtonBrowsing}
          >
            <FormattedMessage id="ui-marccat.browsing.next" />
          </Button>
        </div>
      );
    }
}

export default connect(NextButton, C.META.MODULE_NAME);

