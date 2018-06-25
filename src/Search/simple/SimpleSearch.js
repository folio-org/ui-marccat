import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../Utils';
import SimpleSearchForm from './form/SimpleSearchForm';

class SimpleSearch extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired
  };

  /* TO-DO fill this empty manifest */
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    recordsSearch: {
    }
  });
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          paneTitle={formatMsg({ id: 'ui-cataloging.navigator.simpleSearch' })}
        >
          <SimpleSearchForm {...this.props} initialValues={{}} />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(SimpleSearch, C.META.MODULE_NAME);
