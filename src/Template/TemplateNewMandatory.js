import PropTypes from 'prop-types';
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import Pane from '@folio/stripes-components/lib/Pane';
import Button from '@folio/stripes-components/lib/Pane';
import { remapMultiArray } from '../Utils/Mapper';
import NewTemplateForm from './form/NewTemplateForm';
import * as C from '../Utils';
import Link from 'react-router-dom/Link';
import css from './styles/TemplateView.css';

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

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const { resources: { records } } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const fields = records.records;
    let obj = remapMultiArray(fields);

    const style = {
      marginTop: '30px',
      width: '100%',
      height: '100%',
    };

    return (
      <div >
        <NewTemplateForm {...this.props} />
        <div style={style}>
          <MultiColumnList
            id={C.API_RESULT_JSON_KEY.FIELDS}
            contentData={obj}
            onRowClick={() => { }}
            visibleColumns={['categoryCode', 'headerTypeCode', 'code', 'displayValue', 'description']}
            ariaLabel="TemplateNewMandatory"
          />
        </div>
        {this.state.loading && <Icon icon="spinner-ellipsis" width="10px" />}
      </div>
    );
  }
}


export default connect(TemplateNewMandatory, C.META.MODULE_NAME);
