import PropTypes from 'prop-types';
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import { remapMultiArray } from '../Utils/Mapper';
import * as C from '../Utils';


class TemplateNewMandatory extends React.Component {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADER,
      records: C.API_RESULT_JSON_KEY.FIELDS,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    }
  });

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const { resources: { records } } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const fields = records.records;
    let obj = remapMultiArray(fields);

    return (
      <Paneset static>
        <Pane paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}>
          <MultiColumnList
            id={C.API_RESULT_JSON_KEY.FIELDS}
            contentData={obj}
            onRowClick={() => { }}
            visibleColumns={['categoryCode', 'headerTypeCode', 'code', 'displayValue', 'description']}
            ariaLabel="TemplateNewMandatory"
          />
        </Pane>
      </Paneset>
    );
  }
}

TemplateNewMandatory.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default connect(TemplateNewMandatory, C.META.MODULE_NAME);
