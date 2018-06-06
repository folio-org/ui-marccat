import React from 'react';
import PropTypes from 'prop-types';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import { remapMultiArray } from '../Utils/Mapper';
import NewTemplateForm from './form/NewTemplateForm';
import * as C from '../Utils';

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
    }).isRequired
  };

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
