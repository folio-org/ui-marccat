import React from 'react';
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

class MARCCat extends React.Component<*> {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: 30 },
    views: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.DIACRITIC_LIST_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.DIACRITIC,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
  });

  render() {
    const { resources: { views } } = this.props;
    if (!views || !views.hasLoaded) {
      return null;
    }
    const diacritics = views.records;
    alert(diacritics);
    return (
      <div {...this.props} />
    );
  }
}

export default connect(
  MARCCat,
  C.META.MODULE_NAME,
);

