import React from 'react';
import PropTypes from 'prop-types';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { connect } from '@folio/stripes-connect';
import * as C from '../../../Utils';
import { remapMultiArray } from '../../../Utils/Mapper';

class EditTemplateTag extends React.Component {
  static propTypes = {
    onToggle: PropTypes.object.isRequired,
    accordionId: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
    resources: PropTypes.object
  };

  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: C.INITIAL_RESULT_COUNT },
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.TEMPLATE_MANDATORY,
      headers: C.ENDPOINT.HEADERS,
      records: 'fields',
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
  });

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const {
      resources: { records },
    } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const fields = records.records;
    const obj = remapMultiArray(fields);

    const { expanded, onToggle, accordionId } = this.props;
    return (
      <Accordion
        label={formatMsg({
          id:
            'ui-marccat.template.detail.information.mandatory.table',
        })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={12}>
            <MultiColumnList
              contentData={obj}
              onRowClick={() => {}}
              visibleColumns={[
                'categoryCode',
                'headerTypeCode',
                'code',
                'displayValue',
                'description',
              ]}
              ariaLabel="TemplateNewMandatory"
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

EditTemplateTag.propTypes = {
  stripes: PropTypes.shape({
    intl: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(
  EditTemplateTag,
  C.META.MODULE_NAME,
);
