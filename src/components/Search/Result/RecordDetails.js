/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { KeyValue, Row, Col, AccordionSet, FilterAccordionHeader, Accordion } from '@folio/stripes/components';
import InventoryPluggableBtn from '../Button/Inventory';
import type { Props } from '../../../core';
import { getTag245, getTitle245, getTag100, getTitle100 } from '../../../utils/Mapper';
import AssociatedBib from './AssociatedBib';
import { EMPTY_STRING } from '../../../shared/Constants';

import style from '../../../styles/common.css';

type P = Props & {
  items: Array<any>,
}

function RecordDetails({ translate, ...props }: P) {
  const { items, checkDetailsInRow, detailPaneMeta, checkDetailsBibRec } = props;
  const recordDetails = items.replace('LEADER', '000');
  const recordDetailsArray = recordDetails.split('\n');
  const tag245 = getTag245(recordDetailsArray);
  const title245 = getTitle245(recordDetailsArray);
  return (
    <AccordionSet>
      <Accordion
        separator={false}
        header={FilterAccordionHeader}
        label={checkDetailsInRow !== checkDetailsBibRec ? translate({ id: 'ui-marccat.search.details.bibliographic' }) : translate({ id: 'ui-marccat.search.details.authority' })}
      >
        <div className={style.withSpace}>
          <KeyValue
            label={tag245 === EMPTY_STRING ? getTag100(recordDetailsArray) : tag245 + 'Title'}
            value={title245 === EMPTY_STRING ? getTitle100(recordDetailsArray) : title245}
          />
          {Object.keys(detailPaneMeta.meta).map(key => (
            <div>
              {/^\d+$/.test(key) &&
              <Row>
                <Col xs={2} className={style.padding8}>
                  {key}
                </Col>
                <Col xs={10} className={style.padding8}>
                  {detailPaneMeta.meta[key]}
                </Col>
              </Row>
              }
            </div>
          ))}
        </div>
        <InventoryPluggableBtn {...props} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
      </Accordion>
      {checkDetailsBibRec === checkDetailsInRow &&
      <AssociatedBib {...props} />}
    </AccordionSet>
  );
}

export default (connect(
  ({ marccat: { details, associatedRecords } }) => ({
    items: details.records,
    checkDetailsInRow: details.recordType,
    checkDetailsBibRec: associatedRecords.recordType
  }), () => ({})
)(RecordDetails));
