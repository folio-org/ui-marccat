/**
 * @format
 * @flow
 */
import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import css from '../../style/Search.css';
import * as C from '../../../Utils';

type SimpleSearchButtonProps = {
  history: Object;
};
class SimpleSearchButton extends React.Component<SimpleSearchButtonProps, {}> {
  onClick() {
    this.props.history.push(C.INTERNAL_URL.SEARCH_RESULTS);
  }

  render() {
    return (
      <Link to="/cataloging/searchResults">
        <Button
          onClick={this.onClick}
          type="button"
          buttonStyle="primary"
        >
          <FormattedMessage id="ui-marccat.search.searchButton" />
        </Button>
      </Link>
    );
  }
}

export default connect(
  SimpleSearchButton,
  C.META.MODULE_NAME,
);
