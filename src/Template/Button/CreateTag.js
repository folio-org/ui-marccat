import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';
import css from '../styles/TemplateButton.css';

class CreateTag extends React.Component {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.CATEGORY_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.CATEGORIES,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    }
  });

  render() {
    return (
      <div className={css.root}>
        <hr />
        <Button buttonStyle="primary" style={{ 'minHeight': '36px' }}>Create New Tag</Button>
      </div>
    );
  }
}

export default connect(CreateTag, C.META.MODULE_NAME);
