import React from 'react';
import { connect } from 'react-redux';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { AccordionSet, FilterAccordionHeader, Accordion } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import InventoryPluggableBtn from '../Plugin/Inventory';
import type { Props } from '../../../core';
import { getTag245, getTitle245 } from '../Utils/Mapper';
import AssociatedBib from './AssociatedBib';

import style from '../Style/Search.css';

type P = Props & {
  items: Array<any>,
}

function RecordDetails({ translate, ...props }: P) {
  const recordDetails = props.items.replace('LEADER', '   ');
  const recordDetailsArray = recordDetails.split('\n');
  return (
    <AccordionSet>
      <Accordion
        {...props.rest}
        separator={false}
        header={FilterAccordionHeader}
        label={props.checkDetailsInRow !== props.checkDetailsBibRec ? translate({ id: 'ui-marccat.search.details.bibliographic' }) : translate({ id: 'ui-marccat.search.details.authority' })}
      >
        <div className={style.withSpace}>
          <KeyValue
            label={getTag245(recordDetailsArray)}
            value={getTitle245(recordDetailsArray)}
          />
          {recordDetailsArray.map((item, i) =>
            <Row key={i}>
              <Col xs={1} className={style.padding8}>
                {item.trim().substring(0, 3)}
              </Col>
              <Col xs={1} className={style.padding8}>
                {item.substring(6).startsWith('$') ? item.substring(3, 6) : ''}
              </Col>
              <Col xs={10} className={style.padding8}>
                {!item.substring(6).startsWith('$') ? item.substring(3) : item.substring(6)}
              </Col>
            </Row>)}
          <InventoryPluggableBtn {...props} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
        </div>
      </Accordion>
      {props.checkDetailsBibRec === props.checkDetailsInRow &&
      <AssociatedBib {...props} />}
    </AccordionSet>
  );
}

export default (connect(
  ({ marccat: { details, associatedRecords } }) => ({
    items: details.records,
    checkDetailsInRow: details.recordType,
    checkDetailsBibRec: associatedRecords.recordType
  })
)(RecordDetails));
