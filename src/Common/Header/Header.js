import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import css from './Header.css';

const CatalogingHeader = (props) => (
  <div className={css.root}>
    <Row>
      <Col xsOffset={8} xs={4}>
        <Row end="xs">
          <button buttonId="clickable-done-footer" {...props} />
        </Row>
      </Col>
    </Row>
  </div>
);

export default CatalogingHeader;
