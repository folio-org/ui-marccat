import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import * as C from '../../../../Utils';

class SimpleSearchButton extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  onClick() {
    this.props.history.push(C.INTERNAL_URL.SEARCH_RESULTS);
  }

  render() {
    return (
      <Link to="/cataloging/searchResults">
        <Button
          onClick={this.onClick}
          type="button"
          /* disabled={this.props.disabled} */
          buttonStyle="primary"
          /* href="/cataloging/searchResults" */
          style={{ minHeight: '36px' }}
        >
          <FormattedMessage id="ui-cataloging.search.searchButton" />
        </Button>
      </Link>
    );
  }
}

export default connect(
  SimpleSearchButton,
  C.META.MODULE_NAME
);
