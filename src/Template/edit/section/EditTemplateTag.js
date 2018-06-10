import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';



class EditTemplateTag extends React.Component {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const template = this.props.selectedTemplate;
    const { expanded, onToggle, accordionId, mandatoryFields } = this.props;
    return (
      <Accordion
        label={formatMsg({ id: 'ui-cataloging.template.detail.information.title' })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={12}>
            <MultiColumnList
              loading
              contentData={[]}
              onRowClick={() => { }}
              visibleColumns={
                                ['categoryCode', 'headerTypeCode', 'code', 'displayValue', 'description']}
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
  }).isRequired
};

export default EditTemplateTag;
