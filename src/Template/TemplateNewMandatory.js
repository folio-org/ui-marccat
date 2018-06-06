import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import { remapMultiArray } from '../Utils/Mapper';
import { TemplateForm } from './';
import * as C from '../Utils';

import css from './styles/TemplateView.css';

class TemplateNewMandatory extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    router: PropTypes.shape({// eslint-disable-line react/no-unused-prop-types
      history: PropTypes.shape({
        replace: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.FIELDS,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    }
  });

  render() {
    const { resources: { records } } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const fields = records.records;
    let obj = remapMultiArray(fields);

    return (
      <div className={css.form}>
        <TemplateForm {...this.props} field={obj} />
      </div>
    );
  }
}

export default connect(TemplateNewMandatory, C.META.MODULE_NAME);
