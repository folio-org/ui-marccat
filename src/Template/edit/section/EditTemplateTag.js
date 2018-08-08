/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { connect } from '@folio/stripes-connect';
import * as C from '../../../Utils';
import { remapTemplateView } from '../../../Utils/Mapper';

class EditTemplateTag extends React.Component {
  static propTypes = {
    onToggle: PropTypes.object.isRequired,
    accordionId: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
    resources: PropTypes.object,
  };


  static manifest = Object.freeze({
    details: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
    },
  });

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const {
      resources: { details },
    } = this.props; // eslint-disable-line react/prop-types
    if (!details || !details.hasLoaded) return <div />;
    const fields = details.records[0];
    const resultTemplateView = remapTemplateView(fields);

    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={formatMsg({
          id:
            'ui-marccat.template.detail.information.fields.table',
        })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={12}>
            <MultiColumnList
              contentData={resultTemplateView}
              onRowClick={() => {}}
              visibleColumns={[
                'code',
                'description',
                'displayValue',
              ]}
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
