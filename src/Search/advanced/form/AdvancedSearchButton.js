import React from 'react';
import PropTypes from 'prop-types';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import * as C from '../../../Utils';

class AdvancedSearchButton extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func
    }),
    match: {
      path: PropTypes.string,
      url: PropTypes.string
    }
  }

  onClick() {
    this.props.history.push(C.INTERNAL_URL.SEARCH_RESULTS);
  }

  render() {
    const rootPath = this.props.match.path || this.props.match.url;
    return (
      <Link to={`${rootPath}/searchResults`} >
        <Button
          onClick={this.onClick}
          type="button"
          /* disabled={this.props.disabled} */
          buttonStyle="primary"
          /* href="/cataloging/searchResults" */
          style={{ 'minHeight': '36px' }}
        >
          <FormattedMessage id="ui-cataloging.search.searchButton" />
        </Button>
      </Link>
    );
  }
}

export default connect(AdvancedSearchButton, C.META.MODULE_NAME);
