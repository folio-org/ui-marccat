import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import css from './Footer.css';
import { CreateTag } from '../../Template/';

class CatalogingFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.root}>
        <Row>
          <Col xsOffset={8} xs={4}>
            <Row end="xs">
              <CreateTag />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CatalogingFooter;

