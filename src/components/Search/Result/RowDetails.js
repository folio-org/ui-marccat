import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';


type Props = {
  items: Array<any>
}

function RowDetails(props:Props) {
  const recordDetails = props.items.replace('LEADER', '');
  const recordDetailsArray = recordDetails.split('\n');
  return (
    <div>
      {recordDetailsArray.map(item =>
        <Row>
          <Col xs={1}>
            {item.substring(0, 4)}
          </Col>
          <Col xs={1}>
            {item.substring(6).startsWith('$') ? item.substring(4, 6) : ''}
          </Col>
          <Col xs={10}>
            {!item.substring(6).startsWith('$') ? item.substring(4) : item.substring(6)}
          </Col>
        </Row>)}
    </div>
  );
}


export default (connect(
  ({ marccat: { details, scan } }) => ({
    items: details.records,
    headings: scan.records
  })
)(RowDetails));
