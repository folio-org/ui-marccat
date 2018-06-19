import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import AdvancedSearchForm from './form/AdvancedSearchForm';
import * as C from '../../Utils';

class AdvancedSearch extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    indexCategories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.INDEX_CATEGORY,
      headers: C.ENDPOINT.HEADERS,
      records: 'categories',
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG, type: 'P' },
      },
    }
  });
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          paneTitle={formatMsg({ id: 'ui-cataloging.navigator.search' })}
        >
          <AdvancedSearchForm {...this.props} initialValues={{}} />
        </Pane>
      </Paneset>
    );
  }
}
export default connect(AdvancedSearch, C.META.MODULE_NAME);
