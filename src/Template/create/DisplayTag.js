import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import './style/CreateTag.css';

type DisplayTagProps = {
};

const DisplayTag = () => {
  return (
    <div className="currentTag">
      <Row id="section-current-tag">
        <Col xs={12}>
          <div>current tag</div>
        </Col>
      </Row>
    </div>
  );
};

export default DisplayTag;
