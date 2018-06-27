import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import { FormattedMessage } from 'react-intl';
import SearchProps from '../../type';
import * as C from '../../../Utils';

class AdvancedSearchButton extends React.Component<SearchProps> {

  render() {
    return (
      <Button
        href='searchResults'
        type="submit"
        buttonStyle="primary"
        style={{ 'minHeight': '36px' }}
        onClick={
          () => {
            this.props.history.push(C.INTERNAL_URL.ADD_TEMPLATE);
          }
        }
      >
        <FormattedMessage id="ui-cataloging.search.searchButton" />
      </Button>
    );
  }
}

export default connect(AdvancedSearchButton, C.META.MODULE_NAME);
