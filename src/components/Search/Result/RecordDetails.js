import React from 'react';
import { connect } from 'react-redux';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from 'react-flexbox-grid';
import InventoryPluggableBtn from '../Plugin/Inventory';
import type { Props } from '../../../core';
import style from '../Style/Search.css';
import { getTag245, getTitle245 } from '../../../utils/Mapper';

type P = Props & {
  items: Array<any>
}

function RecordDetails({ translate, ...props }: P) {
  const recordDetails = props.items.replace('LEADER', '');
  const recordDetailsArray = recordDetails.split('\n');
  return (
    <div className={style.withSpace}>
      <KeyValue
        label={getTag245(recordDetailsArray)}
      >
        <h2>{getTitle245(recordDetailsArray)}</h2>
      </KeyValue>
      {recordDetailsArray.map(item =>
        <Row>
          <Col xs={1} style={{ paddingBottom: '8px' }}>
            {item.substring(0, 4)}
          </Col>
          <Col xs={1} style={{ paddingBottom: '8px' }}>
            {item.substring(6).startsWith('$') ? item.substring(4, 6) : ''}
          </Col>
          <Col xs={10} style={{ paddingBottom: '8px' }}>
            {!item.substring(6).startsWith('$') ? item.substring(4) : item.substring(6)}
          </Col>
        </Row>)}
      <InventoryPluggableBtn {...props} buttonLabel={translate({ id: 'ui-marccat.search.goto.inventory' })} />
    </div>
  );
}

export default (connect(
  ({ marccat: { details, scan } }) => ({
    items: details.records,
    headings: scan.records
  })
)(RecordDetails));
