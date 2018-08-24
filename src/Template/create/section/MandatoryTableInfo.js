/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import css from '../../styles/Template.css';
import { remapMultiArray } from '../../../Utils/Mapper';

type MandatoryTableInfoProps = {
    translate: (o:Object) => void;
    onToggle: () => void;
    expanded: boolean;
    accordionId: string;
};

const MandatoryTableInfo = ({ translate, expanded, accordionId, onToggle, ...props }:MandatoryTableInfoProps) => {
  const mandatoryFields = props.state.ui_marccat_mandatory.records;
  const obj = remapMultiArray(mandatoryFields);
  return (
    <Accordion
      label={translate({ id: 'ui-marccat.template.detail.information.fields.table' })}
      open={expanded}
      id={accordionId}
      onToggle={onToggle}
    >
      <Row className={css.mandatoryList}>
        <Col xs={12}>
          <MultiColumnList
            contentData={obj}
            visibleColumns={[
              'code',
              'description',
              'displayValue',
            ]}
            columnMapping={{ code: 'code', description: 'description', displayValue: 'displayValue' }}
            columnWidths={{ code: '12%', description: '40%', displayValue: '40%' }}
            ariaLabel="TemplateNewMandatory"
            rowMetadata={['categoryCode', 'code', 'description', 'displayValue', 'headerTypeCode', 'mandatory', 'defaultSubfieldCode', 'subfields']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

export default MandatoryTableInfo;
