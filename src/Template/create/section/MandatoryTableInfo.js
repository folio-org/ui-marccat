/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { remapMultiArray } from '../../../Utils/Mapper';
import css from '../../styles/Template.css';

type MandatoryTableInfoProps = {
    translate: (o:Object) => void;
    onToggle: () => void;
    expanded: boolean;
    accordionId: string;
};

const MandatoryTableInfo = ({ translate, expanded, accordionId, onToggle }:MandatoryTableInfoProps) => {
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
            contentData={{}}
            visibleColumns={[
              'code',
              'description',
              'displayValue',
            ]}
            ariaLabel="TemplateNewMandatory"
            rowMetadata={['categoryCode', 'code', 'description', 'displayValue', 'headerTypeCode', 'mandatory', 'defaultSubfieldCode', 'subfields']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

export default MandatoryTableInfo;
